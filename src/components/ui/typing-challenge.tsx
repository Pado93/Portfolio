"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

const phrases = [
  "ciao io sono lollo",
  "openai crea magia",
  "scrivere codice è bello",
  "react è potente",
  "digitare è divertente"
];

export const TypingChallenge = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [scrambledText, setScrambledText] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrambleInterval = useRef<NodeJS.Timeout | null>(null);

  const sentence = phrases[sentenceIndex];

  const getRandomChar = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234isCompleted";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const startScramble = useCallback((toText: string, onComplete: () => void) => {
    let iterations = 0;
    const toChars = toText.split("");
    const totalSteps = toChars.length;

    if (scrambleInterval.current) {
      clearInterval(scrambleInterval.current);
    }

    scrambleInterval.current = setInterval(() => {
      iterations++;
      const newText = toChars.map((char, index) => {
        if (index < iterations) {
          return char;
        }
        return getRandomChar();
      });

      setScrambledText(newText);

      if (iterations >= totalSteps) {
        clearInterval(scrambleInterval.current!);
        onComplete();
      }
    }, 40);
  }, []);

  const handleCompletion = useCallback(() => {
    setScrambledText(sentence.split(""));
    setIsCompleted(true);
  }, [sentence]);

  useEffect(() => {
    if (isCompleted) {
      const borderAnimationDuration = 900;

      const timeoutId = setTimeout(() => {
        const nextIndex = (sentenceIndex + 1) % phrases.length;
        const nextSentence = phrases[nextIndex];

        startScramble(nextSentence, () => {
          setTimeout(() => {
            setSentenceIndex(nextIndex);
            setUserInput("");
            setIsCompleted(false);
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 100);
        });
      }, borderAnimationDuration);

      return () => clearTimeout(timeoutId);
    }
  }, [isCompleted, sentenceIndex, startScramble]);

  useEffect(() => {
    if (userInput === sentence && !isCompleted) {
      handleCompletion();
    }
  }, [userInput, sentence, isCompleted, handleCompletion]);

  const completionPercentage = useMemo(() => {
    if (isCompleted) return 1;
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === sentence[i]) {
        correctChars++;
      } else {
        break;
      }
    }
    return sentence.length > 0 ? correctChars / sentence.length : 0;
  }, [userInput, sentence, isCompleted]);

  const feedbackText = useMemo(() => {
    const displayText = isCompleted ? scrambledText : sentence.split("");

    return displayText.map((char, index) => {
      const userChar = userInput[index];
      let className = "text-gray-400";

      if (!isCompleted) {
        if (userChar === char) className = "text-green-500";
        else if (userChar !== undefined && userChar !== char)
          className = char === " " ? "bg-red-500/50 rounded" : "text-white bg-red-500 rounded";
      }

      return (
        <motion.span
          key={index}
          className={className}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
        >
          {char}
        </motion.span>
      );
    });
  }, [sentence, userInput, isCompleted, scrambledText]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      aria-label="Simulated code block with developer information"
      className="w-full lg:w-1/2 bg-zinc-800/50 relative shadow-lg text-foreground select-none cursor-text"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-200 ease-linear"
          style={{ width: `${completionPercentage * 100}%` }}
        />
        <div
          className={clsx(
            "absolute top-0 right-0 w-[2px] bg-gradient-to-b from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "h-full duration-200 delay-100": isCompleted,
              "h-0 duration-200": !isCompleted,
            }
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "w-full duration-400 delay-300": isCompleted,
              "w-0 duration-200": !isCompleted,
            }
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "h-full duration-200 delay-700": isCompleted,
              "h-0 duration-200": !isCompleted,
            }
          )}
        />
      </div>

      <div className="relative z-10 px-2 sm:px-0">
        <div className="py-2 px-4 text-xl font-bold font-mono whitespace-pre-wrap">
          <span aria-label="Testo da digitare">{feedbackText}</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isCompleted}
          className="w-full p-4 font-mono dark:bg-gray-800 outline-none text-zinc-400 text-base cursor-default bg-transparent"
        />
      </div>
    </div>
  );
};
