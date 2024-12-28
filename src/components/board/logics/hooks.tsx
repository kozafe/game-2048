"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { TouchEvent } from "react";
import { Direction } from "./swipe/interface";

interface Event {
  clientX: number;
  clientY: number;
}

export const useReplaceParams = () => {
  const { replace: replaceRouter } = useRouter();

  const replace = (string?: string) =>
    replaceRouter(
      `?score=${localStorage.getItem("score") || 0}&highScore=${
        localStorage.getItem("highScore") || 0
      }${string}`
    );

  return replace;
};

const useSwipe = () => {
  const replace = useReplaceParams();
  const direction = useSearchParams().get("direction") as Direction;
  // const is1024 = useSearchParams().get("is1024") as booleanQuery;

  let startX: number, startY: number, endX: number, endY: number;

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }

  function onTouchMove(event: TouchEvent<HTMLDivElement>) {
    event.preventDefault(); // Prevent scrolling
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const touch = event.changedTouches[0];
    endX = touch.clientX;
    endY = touch.clientY;

    onSwipe();
  }

  function onSwipe() {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const swiped = Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5;

    if (!swiped) return;

    const text = (() => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) return "right";
        return "left";
      }
      if (deltaY > 0) return "down";
      return "up";
    })();

    const queryAnimation = `&animation=${text}`;
    const query = `&direction=${text}`;

    replace(queryAnimation);

    setTimeout(() => replace(query), 100);
  }

  const onMouseDown = (e: Event) => {
    startX = e.clientX;
    startY = e.clientY;
  };

  const onMouseUp = (e: Event) => {
    endX = e.clientX;
    endY = e.clientY;

    onSwipe();
  };

  return {
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    onMouseDown,
    onMouseUp,
    direction,
  };
};

export default useSwipe;
