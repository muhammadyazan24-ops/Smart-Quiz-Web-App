"use client";

import { useState, useRef } from "react";
import styles from "./UploadSection.module.css";

export default function UploadSection({ onFileSelect }: { onFileSelect: (files: File[]) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSelect(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelect(Array.from(e.target.files));
    }
  };

  const validateAndSelect = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === "application/pdf" || 
      file.type.includes("presentation") || 
      file.name.endsWith(".pdf") || 
      file.name.endsWith(".pptx") || 
      file.name.endsWith(".ppt")
    );

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    } else {
      alert("Please upload valid PDF or PPT files.");
    }
  };

  return (
    <div 
      className={`glass-panel ${styles.uploadZone} ${isDragging ? styles.dragging : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        multiple
        accept=".pdf,.ppt,.pptx" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className={styles.hiddenInput} 
      />
      
      <div className={styles.iconWrapper}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      
      <h3 style={{ marginBottom: '0.5rem' }}>Drag & Drop multiple files here</h3>
      <p style={{ color: 'var(--text-muted)' }}>Or click to browse files (PDF, PPT)</p>
    </div>
  );
}
