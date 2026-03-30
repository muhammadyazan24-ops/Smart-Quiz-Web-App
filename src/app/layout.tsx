import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI MCQ Generator & Study Assistant',
  description: 'Upload your study materials (PDF/PPT) and generate customized MCQs with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
