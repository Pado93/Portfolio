"use client";

import React, { useState, useMemo, useRef } from "react";

import { CarIconGradient } from "@/assets/CarIconGradient";

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

  const carStyle = {
    left: `calc(${completionPercentage * 100}% - ${completionPercentage * 32}px)`,
    transition: "left 0.2s linear",
  };

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
      className="w-full lg:w-1/2 bg-zinc-800/50 border border-[#1b2c68a0] relative rounded-lg shadow-lg px-2 sm:px-0 text-foreground select-none"
    >
      <div
        className="absolute top-[-32px]"
        style={carStyle}
      >
        <CarIconGradient size={32}/>
      </div>

      <div className="flex flex-row">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent" />
      </div>

      <div className="py-2 px-4 text-xl font-bold">
        <span aria-label="Testo da digitare">{feedbackText}</span>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isCompleted}
        className="w-full p-4 font-mono dark:bg-gray-800 outline-none text-zinc-400 text-base cursor-default"
        placeholder="Inizia a scrivere qui..."
        aria-label="Campo di input"
        maxLength={sentence.length}
      />
    </div>
  );
};
