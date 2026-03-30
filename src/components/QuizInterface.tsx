"use client";

import { useState } from "react";
import styles from "./QuizInterface.module.css";

export interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number, total: number) => void;
}

export default function QuizInterface({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQ.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score + (selectedOption === currentQ.answer && !isAnswered ? 1 : 0), questions.length);
    }
  };

  return (
    <div className={`glass-panel ${styles.quizContainer}`}>
      <div className={styles.header}>
        <span className={styles.progress}>Question {currentIndex + 1} of {questions.length}</span>
        <span className={styles.scoreBadge}>Score: {score}</span>
      </div>

      <h3 className={styles.questionText}>{currentQ.question}</h3>

      <div className={styles.optionsGrid}>
        {currentQ.options.map((option, idx) => {
          let optionClass = styles.option;
          if (isAnswered) {
            if (option === currentQ.answer) {
              optionClass += ` ${styles.correct}`;
            } else if (option === selectedOption) {
              optionClass += ` ${styles.incorrect}`;
            } else {
              optionClass += ` ${styles.dimmed}`;
            }
          } else if (selectedOption === option) {
            optionClass += ` ${styles.selected}`;
          }

          return (
            <button 
              key={idx} 
              className={optionClass}
              onClick={() => handleSelect(option)}
              disabled={isAnswered}
            >
              <span className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</span>
              <span className={styles.optionText}>{option}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`${styles.explanationBox} animate-fade-in`}>
          <h4 className={selectedOption === currentQ.answer ? styles.textSuccess : styles.textDanger}>
            {selectedOption === currentQ.answer ? "Correct!" : "Incorrect."}
          </h4>
          <p>{currentQ.explanation}</p>
        </div>
      )}

      <div className={styles.actions}>
        {!isAnswered ? (
          <button className="btn" onClick={handleSubmit} disabled={!selectedOption}>
            Submit Answer
          </button>
        ) : (
          <button className="btn" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
