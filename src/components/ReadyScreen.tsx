"use client";

interface ReadyScreenProps {
  questionCount: number;
  onStartTest: () => void;
  onDownloadPDF: () => void;
  onRestart: () => void;
}

export default function ReadyScreen({ questionCount, onStartTest, onDownloadPDF, onRestart }: ReadyScreenProps) {
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '4rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Quiz is Ready!</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>
        We've successfully processed your study materials and generated {questionCount} questions. How would you like to proceed?
      </p>
      
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <button 
          className="btn btn-secondary" 
          style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          onClick={onDownloadPDF}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </button>
        
        <button 
          className="btn" 
          style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          onClick={onStartTest}
        >
          Start Practice Test
        </button>
        
        <button 
          className="btn btn-secondary" 
          style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
          onClick={onRestart}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
