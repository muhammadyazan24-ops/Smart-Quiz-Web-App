# AI Study Assistant & MCQ Generator (Frontend Demo)

### 🌐 Live Testing & Demo
You can test the fully functional, live version of this project here: **[https://ai-mcq-s-generator.vercel.app/](https://ai-mcq-s-generator.vercel.app/)**

> 🔒 **Repository Note:** This is a **frontend-only demonstration repository** intended to showcase the UI/UX, React component architecture, and offline export utilities. 
> 
> The core proprietary AI engine (the Next.js backend API routes, Google Gemini prompt logic, and PPTX parsing algorithms) have been **intentionally redacted** to protect intellectual property. If you try to run this repository locally and click "Generate", it will fail because the backend engine is missing. 
>
> If you wish to purchase the **full, working source code**, please see the licensing section at the bottom.

---

An intelligent, full-stack Next.js application designed to help students prepare for exams by transforming standard study materials (PDFs, PPTs) into interactive, exportable Multiple Choice Question (MCQ) quizzes. 

## 🚀 Key Features Demonstrated in this UI

- **Smooth Multi-Step Flow**: A state machine implementation that shifts users cleanly through `upload` -> `configure` -> `ready` -> `quiz` -> `results` without page reloads.
- **Custom Drag-and-Drop Zone**: A polished upload interface that filters and accepts PDF and PPTX slide decks.
- **Interactive Quiz Interface**: Clean, glassmorphic UI tracking user selections and mapping complex AI-generated JSON payloads.
- **Offline Exports**: Demonstration of pure client-side file generation. Exports flashcards to CSV (for Anki/Quizlet) and generates beautiful PDFs using an invisible canvas.

---

## 💻 Frontend Tech Stack

- **Framework**: Next.js 14+ (App Router), React 18, HTML5.
- **Styling**: Vanilla CSS3 (Custom Glassmorphism themes, strictly avoiding heavy Tailwind/Bootstrap dependencies to ensure ultimate semantic control).
- **Language**: TypeScript (Strict typing for robust component architecture).
- **Client Utilities**: `jspdf` (for PDF exporting).

---

## 📁 Repository Structure

Here are the frontend files available for review in this repository:

### 1. Global Setup
- **`src/app/layout.tsx`**: Core HTML root layout managing global metadata.
- **`src/app/globals.css`**: The design system, housing CSS variables and `.glass-panel` minimalist utilities.

### 2. The Main Page Flow
- **`src/app/page.tsx`**: The frontend control tower. Handles shifting the user through the 5 distinct application steps and manages the uploaded `File[]` state.

### 3. Feature Components
- **`src/components/UploadSection.tsx`**: Drag-and-drop zone filtering for strictly unsupported files natively.
- **`src/components/ConfigurationPanel.tsx`**: Form state handling MCQ counts and difficulty sliders.
- **`src/components/QuizInterface.tsx`**: The interactive testing module.
- **`src/components/ResultsDashboard.tsx`**: Processes final scores and triggers raw CSS success transitions.

### 4. Utilities
- **`src/utils/export.ts`**: Pure helper functions handling programmatic PDF drawing and CSV blob downloads.

---

## 👨‍💻 Author & Attribution

**Built and Designed by:** Yazan

### 💼 Purchase a Commercial License / Full Source Code

If you want the **fully functional codebase** (including the proprietary Gemini AI integration, Prompts, and backend parsing engine) for your own business, educational institution, or commercial project, **you must purchase a commercial license from me.** 

Please reach out to me directly to discuss pricing, licensing, or white-labeling the software:
- **Contact Email / Social:** [Insert Your Email / LinkedIn / Contact Here]

### ⚖️ Copyright & License

© 2026 Yazan. All Rights Reserved.

This specific frontend repository and its designs are my intellectual property. 
- You may view and review the frontend code for educational purposes.
- You **may not** explicitly copy, duplicate, or redistribute this repository and claim it as your own work. 
- Commercial use, reproduction, or rebranding of this Web Software without purchasing a license is strictly prohibited.
