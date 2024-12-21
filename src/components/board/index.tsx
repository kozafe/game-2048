"use client";
import useSwipe from "@/components/board/logics/hooks";
import { useEffect, useState } from "react";
import swipeArray from "./logics/swipe";
import numberColors from "./logics/colors";

const Board = () => {
  const { direction, ...rest } = useSwipe();

  const [arr, setArr] = useState([
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 4, 0],
    [0, 0, 0, 0],
  ]);

  useEffect(() => {
    if (!direction) return;

    const array = swipeArray(arr, direction);
    setArr(array);
  }, [direction]);

  return (
    <div className="grid select-none p-2 bg-[#C65D3B] rounded-[4px]" {...rest}>
      {arr.map((array, index) => (
        <div className="grid grid-cols-4 p-1 gap-2" key={index}>
          {array.map((number, index) => (
            <div
              className="flex items-center justify-center rounded-[4px] font-bold"
              style={{ aspectRatio: 1, backgroundColor: numberColors(number) }}
              key={index}
            >
              {!!number && number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
