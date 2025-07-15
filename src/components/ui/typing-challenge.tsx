"use client";

import React, { useState, useMemo, useRef } from "react";
import clsx from "clsx";

export const TypingChallenge = () => {
  const sentence = "ciao io sono lollo";
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isCompleted = userInput === sentence;

  const completionPercentage = useMemo(() => {
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === sentence[i]) {
        correctChars++;
      } else {
        break;
      }
    }
    return sentence.length > 0 ? correctChars / sentence.length : 0;
  }, [userInput, sentence]);

  const feedbackText = useMemo(() => {
    return sentence.split("").map((char, index) => {
      const userChar = userInput[index];
      if (userChar === undefined) {
        return <span key={index} className="text-gray-400">{char}</span>;
      }
      if (userChar === char) {
        return <span key={index} className="text-green-500">{char}</span>;
      }
      if (char === " ") {
        return <span key={index} className="bg-red-500/50 rounded"> </span>;
      }
      return <span key={index} className="text-white bg-red-500 rounded">{char}</span>;
    });
  }, [sentence, userInput]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      aria-label="Simulated code block with developer information"
      className="w-full lg:w-1/2 bg-zinc-800/50 border border-[#1b2c68a0] relative rounded-lg shadow-lg text-foreground select-none cursor-text"
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">

        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-200 ease-linear"
          style={{ width: `${completionPercentage * 100}%` }}
        />

        <div
          className={clsx(
            "absolute top-0 right-0 w-[2px] bg-gradient-to-b from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "h-full duration-200 delay-100": isCompleted, // dura 500ms, parte dopo 200ms
              "h-0 duration-200": !isCompleted,
            }
          )}
        />

        <div
          className={clsx(
            "absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-violet-600 to-pink-500 transition-all ease-in-out",
            {
              "w-full duration-400 delay-300": isCompleted, // dura 700ms, parte dopo 700ms (500+200)
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
        <div className="py-2 px-4 text-xl font-bold">
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
