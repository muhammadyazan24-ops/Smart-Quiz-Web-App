"use client";

import { useState } from "react";
import styles from "./ConfigurationPanel.module.css";

interface ConfigurationProps {
  onGenerate: (config: { questionCount: number; difficulty: string }) => void;
  onBack: () => void;
  isGenerating: boolean;
}

export default function ConfigurationPanel({ onGenerate, onBack, isGenerating }: ConfigurationProps) {
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<string>("medium");

  return (
    <div className={`glass-panel ${styles.panel}`}>
      <h2 style={{ marginBottom: '1.5rem' }}>Quiz Settings</h2>
      
      <div className={styles.formGroup}>
        <label>
          Number of Questions: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{questionCount}</span>
        </label>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={questionCount} 
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className={styles.rangeSlider}
            style={{ flex: 1 }}
          />
          <input 
            type="number" 
            min="1" 
            max="100" 
            value={questionCount} 
            onChange={(e) => setQuestionCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            style={{ width: '60px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc', textAlign: 'center' }}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Difficulty Level</label>
        <div className={styles.radioGroup}>
          {["easy", "medium", "hard"].map((level) => (
            <label key={level} className={`${styles.radioBox} ${difficulty === level ? styles.active : ""}`}>
              <input 
                type="radio" 
                name="difficulty" 
                value={level} 
                checked={difficulty === level}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ display: 'none' }}
              />
              <span style={{ textTransform: 'capitalize' }}>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className="btn btn-secondary" onClick={onBack} disabled={isGenerating}>Back</button>
        <button 
          className="btn" 
          onClick={() => onGenerate({ questionCount, difficulty })}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    </div>
  );
}
