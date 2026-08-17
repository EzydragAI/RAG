"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QUIZ_QUESTIONS } from "@/content/quiz";
import { cn } from "@/lib/utils";

export function QuizEngine() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    () => Array(QUIZ_QUESTIONS.length).fill(null),
  );

  const question = QUIZ_QUESTIONS[index];
  const finished = index >= QUIZ_QUESTIONS.length;
  const locked = picked !== null;

  const review = useMemo(
    () =>
      QUIZ_QUESTIONS.map((item, questionIndex) => ({
        ...item,
        chosen: answers[questionIndex],
      })),
    [answers],
  );

  if (finished) {
    const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardContent className="text-center">
            <p className="text-sm tracking-widest text-sky-400 uppercase">Class quiz</p>
            <h1 className="mt-2 text-4xl font-bold text-white">
              {score} / {QUIZ_QUESTIONS.length}
            </h1>
            <p className="mt-2 text-slate-400">{percent}% · {percent >= 80 ? "Iceberg mastered." : "Review the misses below, then retry."}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                onClick={() => {
                  setIndex(0);
                  setPicked(null);
                  setScore(0);
                  setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
                }}
              >
                Retry quiz
              </Button>
              <Button asChild variant="secondary">
                <Link href="/learn?m=wrap">Back to lesson</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-3">
          {review.map((item) => {
            const correct = item.chosen === item.answer;
            return (
              <div key={item.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                <p className="font-semibold text-white">
                  {item.id}. {item.prompt}
                </p>
                <p className={cn("mt-2 text-sm", correct ? "text-emerald-400" : "text-red-400")}>
                  Your answer: {item.chosen == null ? "—" : String.fromCharCode(65 + item.chosen)}. Correct: {String.fromCharCode(65 + item.answer)}
                </p>
                <p className="mt-1 text-sm text-slate-400">{item.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-sky-400">
        Question {index + 1} of {QUIZ_QUESTIONS.length}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{question.prompt}</h1>
      <div className="mt-6 space-y-3">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.answer;
          const isPicked = picked === optionIndex;
          return (
            <button
              key={option}
              type="button"
              disabled={locked}
              onClick={() => {
                setPicked(optionIndex);
                setAnswers((current) => {
                  const next = [...current];
                  next[index] = optionIndex;
                  return next;
                });
                if (optionIndex === question.answer) setScore((value) => value + 1);
              }}
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-left text-slate-200 transition-colors",
                !locked && "border-slate-700 bg-slate-900 hover:border-sky-400",
                locked && isCorrect && "border-emerald-400 bg-emerald-500/10 text-emerald-300",
                locked && isPicked && !isCorrect && "border-red-400 bg-red-500/10 text-red-300",
                locked && !isCorrect && !isPicked && "border-slate-800 bg-slate-950 text-slate-500",
              )}
            >
              <span className="mr-3 font-bold text-sky-400">{String.fromCharCode(65 + optionIndex)}</span>
              {option}
            </button>
          );
        })}
      </div>
      {locked && (
        <div className="mt-6 space-y-4">
          <p className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-slate-300">
            {question.explanation}
          </p>
          <Button
            onClick={() => {
              setPicked(null);
              setIndex((value) => value + 1);
            }}
          >
            {index === QUIZ_QUESTIONS.length - 1 ? "See score" : "Next question"}
          </Button>
        </div>
      )}
    </div>
  );
}
