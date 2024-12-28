"use client";
import useSwipe, { useReplaceParams } from "@/components/board/logics/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import numberColors from "./logics/colors";
import swipeArray from "./logics/swipe";
import useAnimationLogics from "./logics/swipe/animation";
import { Direction } from "./logics/swipe/interface";

const Board = () => {
  const { direction, ...rest } = useSwipe();
  const animation = useSearchParams().get("animation") as Direction;

  const [arr, setArr] = useState([
    [0, 0, 0, 0],
    [2, 0, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [width, setWidth] = useState(0);

  const replace = useReplaceParams();

  useEffect(() => {
    localStorage.setItem("score", `0`);
    replace("");
  }, []);

  useEffect(() => {
    if (!direction) return;

    const array = swipeArray(arr, direction, true);
    replace("");

    setArr(array);
  }, [direction]);

  const boxCounter = useAnimationLogics(arr);

  return (
    <div className="grid select-none p-2 bg-[#C65D3B] rounded-[4px]" {...rest}>
      {arr.map((array, index) => (
        <div className="grid grid-cols-4 p-1 gap-2" key={index}>
          {array.map((number, childIndex) => {
            const num = boxCounter(index, childIndex);

            const transform = (() => {
              const translate = (num: number, isVertical?: boolean) => {
                if (isVertical) return `translate(0px, ${num * width}px)`;

                return `translate(${`${num * width}px`}, 0px)`;
              };

              if (animation === "right") return translate(num);
              if (animation === "left") return translate(-num);
              if (animation === "up") return translate(-num, true);
              return translate(num, true);
            })();

            const conditional = !childIndex &&
              !index && {
                ref: (e: HTMLDivElement) => setWidth(e?.clientWidth || 0),
              };

            return (
              <div
                {...conditional}
                key={childIndex}
                className="flex items-center justify-center rounded-[4px] font-bold"
                style={{
                  aspectRatio: 1,
                  backgroundColor: numberColors(number),
                  position: "relative",
                  transform,
                  transition: "all 0.15s ease-out",
                }}
              >
                {!!number && number}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
