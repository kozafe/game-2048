"use client";
import Board from "@/components/board";

export default function Home() {
  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">2048</h1>
        <div className="text-lg">
          Score: <span id="current-score">0</span>
        </div>
        <div className="text-lg">
          High Score: <span id="high-score">0</span>
        </div>
      </div>
      <Board />

      <button className="mt-4 w-full bg-blue-500 text-white py-2 ">
        Restart
      </button>
    </>
  );
}
