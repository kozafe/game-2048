"use client";
import useSwipe from "@/components/board/logics/hooks";
import { useEffect, useState } from "react";
import swipeArray from "./logics/swipe";

const Board = () => {
  const { direction, ...rest } = useSwipe();

  const [arr, setArr] = useState([
    [0, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  useEffect(() => {
    if (!direction) return;

    const array = swipeArray(arr, direction);
    setArr(array);
  }, [direction]);

  return (
    <div className="grid select-none" {...rest}>
      {arr.map((array, index) => (
        <div className="grid grid-cols-4" key={index}>
          {array.map((item, index) => (
            <div
              className="bg-gray-300 h-16 flex items-center justify-center"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
