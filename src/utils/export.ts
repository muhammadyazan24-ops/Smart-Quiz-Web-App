import jsPDF from "jspdf";
import { Question } from "@/components/QuizInterface";

export const exportToPDF = (questions: Question[], score: number, total: number) => {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229);
  doc.text("AI Study Assistant - Quiz Results", 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`Score: ${score} / ${total} (${Math.round((score/total) * 100)}%)`, 20, 35);
  
  let yPos = 50;
  
  questions.forEach((q, idx) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    
    const questionLines = doc.splitTextToSize(`Q${idx + 1}. ${q.question}`, 170);
    doc.text(questionLines, 20, yPos);
    yPos += (questionLines.length * 7) + 3;
    
    q.options.forEach((opt, i) => {
      const isCorrect = opt === q.answer;
      doc.setFont("helvetica", isCorrect ? "bold" : "normal");
      if (isCorrect) doc.setTextColor(16, 185, 129); // Green for correct answer in PDF
      else doc.setTextColor(0, 0, 0);
      
      const prefix = `${String.fromCharCode(65 + i)}) `;
      const optionLines = doc.splitTextToSize(`${prefix}${opt}`, 160);
      doc.text(optionLines, 25, yPos);
      yPos += (optionLines.length * 7);
    });
    
    yPos += 3;
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    const explanationLines = doc.splitTextToSize(`Explanation: ${q.explanation}`, 170);
    doc.text(explanationLines, 20, yPos);
    yPos += (explanationLines.length * 7) + 12;
    
    doc.setTextColor(0, 0, 0);
  });
  
  doc.save("quiz-results.pdf");
};

export const exportToCSV = (questions: Question[]) => {
  const headers = ["Question", "Answer", "Explanation"];
  
  const csvContent = [
    headers.join(","),
    ...questions.map(q => {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      return [escape(q.question), escape(q.answer), escape(q.explanation)].join(",");
    })
  ].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "flashcards.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
