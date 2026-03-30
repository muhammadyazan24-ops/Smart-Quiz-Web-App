"use client";

import styles from "./ResultsDashboard.module.css";
import { Question } from "./QuizInterface";
import { exportToPDF, exportToCSV } from "@/utils/export";

interface ResultsProps {
  score: number;
  total: number;
  questions: Question[];
  onRestart: () => void;
}

export default function ResultsDashboard({ score, total, questions, onRestart }: ResultsProps) {
  const percentage = Math.round((score / total) * 100);
  
  let message = "Good effort!";
  if (percentage >= 90) message = "Outstanding!";
  else if (percentage >= 70) message = "Great job!";
  else if (percentage < 50) message = "Keep practicing!";

  return (
    <div className={`glass-panel ${styles.resultsContainer} animate-fade-in`}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Quiz Results</h2>
      
      <div className={styles.scoreCircle}>
        <div className={styles.scoreText}>
          <span className={styles.percent}>{percentage}%</span>
          <span className={styles.fraction}>{score} / {total}</span>
        </div>
      </div>
      
      <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'var(--primary)' }}>{message}</h3>
      
      <div className={styles.reviewSection}>
        <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>Review</h4>
        
        {questions.map((q, idx) => (
          <div key={idx} className={styles.reviewItem}>
            <h5>{idx + 1}. {q.question}</h5>
            <p className={styles.correctAnswer}>Answer: {q.answer}</p>
            <p className={styles.explanation}>{q.explanation}</p>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button className="btn btn-secondary" onClick={() => exportToPDF(questions, score, total)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export to PDF
        </button>
        <button className="btn btn-secondary" onClick={() => exportToCSV(questions)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export CSV (Flashcards)
        </button>
        <button className="btn" onClick={onRestart}>Start New Quiz</button>
      </div>
    </div>
  );
}
