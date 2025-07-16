"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

const phrases = [
  "ciao io sono lollo",
  "openai crea magia",
  "scrivere codice è bello",
  "react è potente",
  "digitare è divertente",
];

export const TypingChallenge = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [scrambledText, setScrambledText] = useState<string[]>([]);
  const [topBarWidth, setTopBarWidth] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrambleInterval = useRef<NodeJS.Timeout | null>(null);

  const sentence = phrases[sentenceIndex];

  const getRandomChar = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const startScramble = useCallback((toText: string, onComplete: () => void) => {
    let iterations = 0;
    const toChars = toText.split("");
    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    scrambleInterval.current = setInterval(() => {
      iterations++;
      const newText = toChars.map((char, index) => (index < iterations ? char : getRandomChar()));
      setScrambledText(newText);
      if (iterations >= toChars.length) {
        clearInterval(scrambleInterval.current!);
        onComplete();
      }
    }, 40);
  }, []);

  const handleCompletion = useCallback(() => {
    setScrambledText(sentence.split(""));
    setIsCompleted(true);
    setTopBarWidth(100);
  }, [sentence]);

  useEffect(() => {
    if (shouldFocus && !isCompleted) {
      inputRef.current?.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus, isCompleted]);

  useEffect(() => {
    if (isCompleted && !isResetting) {
      const borderAnimationDuration = 900;
      const timeoutId = setTimeout(() => {
        const nextSentence = phrases[(sentenceIndex + 1) % phrases.length];
        startScramble(nextSentence, () => setIsResetting(true));
      }, borderAnimationDuration);
      return () => clearTimeout(timeoutId);
    }
  }, [isCompleted, isResetting, sentenceIndex, startScramble]);

  useEffect(() => {
    if (isResetting) {
      const hideAnimationDuration = 1000;
      const topBarDelay = 800;
      const topBarTimeout = setTimeout(() => setTopBarWidth(0), topBarDelay);
      const resetTimeout = setTimeout(() => {
        const nextIndex = (sentenceIndex + 1) % phrases.length;
        setSentenceIndex(nextIndex);
        setUserInput("");
        setIsCompleted(false);
        setIsResetting(false);
        setIsGlowing(true);
        setShouldFocus(true);
      }, hideAnimationDuration);
      return () => {
        clearTimeout(topBarTimeout);
        clearTimeout(resetTimeout);
      };
    }
  }, [isResetting, sentenceIndex]);

  useEffect(() => {
    if (isGlowing) {
      const glowTimeout = setTimeout(() => setIsGlowing(false), 700);
      return () => clearTimeout(glowTimeout);
    }
  }, [isGlowing]);

  useEffect(() => {
    if (userInput === sentence && !isCompleted) {
      handleCompletion();
    }
  }, [userInput, sentence, isCompleted, handleCompletion]);

  useEffect(() => {
    if (!isCompleted && !isResetting) {
      const percentage = sentence.length > 0 ? (userInput.length / sentence.length) * 100 : 0;
      setTopBarWidth(percentage);
    }
  }, [userInput, sentence, isCompleted, isResetting]);

  const feedbackText = useMemo(() => {
    const displayText = isCompleted ? scrambledText : sentence.split("");
    return displayText.map((char, index) => {
      const userChar = userInput[index];
      let className = "text-gray-400";
      if (!isCompleted) {
        if (userChar === char) className = "text-green-500";
        else if (userChar !== undefined)
          className = "text-white bg-red-500";
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

  const handleInteraction = useCallback(() => {
    if (!hasInteracted) {
      setIsGlowing(true);
      setHasInteracted(true);
    }
    setShouldFocus(true);
  }, [hasInteracted]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleInteraction();
      }
    },
    [handleInteraction]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleInteraction}
      aria-label="Simulated code block"
      className={clsx(
        "w-full lg:w-1/2 bg-zinc-800/50 relative text-foreground select-none outline-none",
        "transition-shadow duration-700",
        {
          "shadow-[0_0_15px_rgba(255,255,255,0.6)]": isGlowing,
          "shadow-lg": !isGlowing,
        }
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-200 ease-linear"
          style={{ width: `${topBarWidth}%` }}
        />
        <div
          className={clsx(
            "absolute top-0 right-0 w-[2px] bg-gradient-to-b from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "h-full duration-200 delay-100": isCompleted && !isResetting,
              "h-0 duration-200 delay-[600ms]": isResetting,
              "h-0": !isCompleted,
            }
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "w-full duration-400 delay-300": isCompleted && !isResetting,
              "w-0 duration-400 delay-200": isResetting,
              "w-0": !isCompleted,
            }
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "h-full duration-200 delay-700": isCompleted && !isResetting,
              "h-0 duration-200": isResetting,
              "h-0": !isCompleted,
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
          className="w-full p-4 font-mono bg-transparent outline-none text-zinc-400 text-base cursor-default"
        />
      </div>
    </div>
  );
};
