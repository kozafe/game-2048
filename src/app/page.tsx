"use client";
import Board from "@/components/board";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const score = useSearchParams().get("score") || 0;
  const highScore = useSearchParams().get("highScore") || 0;

  return (
    <div
      className={
        "max-w-md min-h-screen w-full p-4 bg-[#B76E5D] rounded-lg shadow-lg"
      }
      style={{ transition: "all 0.15s linear" }}
    >
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">2048</h1>
        <div className="text-lg">
          Score: <span id="current-score">{score}</span>
        </div>
        <div className="text-lg">
          High Score: <span id="high-score">{highScore}</span>
        </div>
      </div>
      <Board />
    </div>
  );
}
