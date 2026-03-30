"use client";

interface SelectedFilesListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  onAddMoreFiles: (newFiles: File[]) => void;
  onContinue: () => void;
}

export default function SelectedFilesList({ files, onRemoveFile, onAddMoreFiles, onContinue }: SelectedFilesListProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAddMoreFiles(Array.from(e.target.files));
    }
    // Reset value to allow selecting the same file again if needed
    e.target.value = '';
  };

  return (
    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '1rem' }}>{files.length} File(s) Selected</h3>
      <ul style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}>
        {files.map((f, i) => (
          <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
            <button 
              onClick={() => onRemoveFile(i)}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.5rem', padding: '0 0.5rem', lineHeight: 1 }}
              title="Remove file"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => document.getElementById('add-more-files')?.click()}
        >
          Add More Files
        </button>
        <input 
          type="file" 
          id="add-more-files" 
          multiple 
          accept=".pdf,.ppt,.pptx" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <button 
          className="btn" 
          onClick={onContinue} 
          disabled={files.length === 0}
        >
          Continue to Configuration
        </button>
      </div>
    </div>
  );
}
