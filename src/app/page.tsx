"use client";

import { useState } from "react";
import UploadSection from "@/components/UploadSection";
import SelectedFilesList from "@/components/SelectedFilesList";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import ReadyScreen from "@/components/ReadyScreen";
import QuizInterface, { Question } from "@/components/QuizInterface";
import ResultsDashboard from "@/components/ResultsDashboard";
import { exportToPDF } from "@/utils/export";

type AppStep = "upload" | "configure" | "ready" | "quiz" | "results";

export default function Home() {
  const [step, setStep] = useState<AppStep>("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  const handleGenerate = async (config: { questionCount: number; difficulty: string }) => {
    if (files.length === 0) return;
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("count", config.questionCount.toString());
      formData.append("difficulty", config.difficulty);

      const response = await fetch("/api/generate", { method: "POST", body: formData });
      
      let data;
      const textResponse = await response.text();
      
      try {
        data = JSON.parse(textResponse);
      } catch (err) {
        // If Vercel returns an empty body or HTML (like a 413 or 504 error)
        if (!response.ok) {
          if (response.status === 413) {
             throw new Error("File is too large! Vercel's free tier has a 4.5MB upload limit.");
          }
          if (response.status === 504) {
             throw new Error("The AI took too long to generate the quiz (Vercel timeout). Try requesting fewer questions.");
          }
          throw new Error(`Server Error (${response.status}): ${textResponse.slice(0, 100) || "Empty response from Vercel"}`);
        }
        throw new Error("Received an invalid response from the server.");
      }

      if (!response.ok) throw new Error(data.error || "Failed to generate quiz");

      setQuestions(data.questions);
      setStep("ready");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestart = () => {
    setFiles([]);
    setQuestions([]);
    setScore(0);
    setStep("upload");
  };

  return (
    <main className="container">
      <div style={{ textAlign: 'center', margin: '3rem auto 2rem auto', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #4F46E5, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
          AI Study Assistant
        </h1>
        {step === "upload" && (
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto' }}>
            Upload your syllabus, PPT, or PDF lectures. We'll generate an interactive MCQ simulation and study guide to test your knowledge.
          </p>
        )}
      </div>

      <div style={{ paddingBottom: '4rem' }}>
        {step === "upload" && (
          <div className="animate-fade-in">
            {files.length === 0 ? (
              <UploadSection onFileSelect={setFiles} />
            ) : (
              <SelectedFilesList 
                files={files} 
                onRemoveFile={(index) => setFiles(files.filter((_, i) => i !== index))} 
                onAddMoreFiles={(newFiles) => setFiles([...files, ...newFiles])} 
                onContinue={() => setStep("configure")} 
              />
            )}
          </div>
        )}

        {step === "configure" && (
          <div className="animate-fade-in">
            <ConfigurationPanel 
              onGenerate={handleGenerate} 
              onBack={() => setStep("upload")}
              isGenerating={isGenerating}
            />
          </div>
        )}

        {step === "ready" && (
          <ReadyScreen 
            questionCount={questions.length} 
            onStartTest={() => setStep("quiz")} 
            onDownloadPDF={() => exportToPDF(questions, 0, questions.length)} 
            onRestart={handleRestart} 
          />
        )}

        {step === "quiz" && (
          <div className="animate-fade-in">
            <QuizInterface 
              questions={questions} 
              onComplete={(finalScore) => { setScore(finalScore); setStep("results"); }} 
            />
          </div>
        )}

        {step === "results" && (
          <div className="animate-fade-in">
            <ResultsDashboard 
              score={score} 
              total={questions.length} 
              questions={questions}
              onRestart={handleRestart}
            />
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="loading-overlay animate-fade-in">
          <div className="spinner"></div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Generating Test...</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px' }}>
            We're analyzing your materials using AI to author your quiz. This usually takes 5-20 seconds.
          </p>
        </div>
      )}
    </main>
  );
}
