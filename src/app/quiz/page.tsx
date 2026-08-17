import Link from "next/link";
import { QuizEngine } from "@/components/quiz/QuizEngine";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-slate-800 px-6 py-4">
        <Link href="/" className="text-sm text-sky-400 hover:text-sky-300">
          ← Home
        </Link>
        <h1 className="mt-1 text-lg font-semibold text-white">Module Assessment</h1>
      </header>
      <main className="px-4 py-10">
        <QuizEngine />
      </main>
    </div>
  );
}
