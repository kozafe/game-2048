"use client";
import { TouchEvent, useState } from "react";
import { Direction } from "./swipe/interface";

interface Event {
  clientX: number;
  clientY: number;
}

const useSwipe = () => {
  let startX: number, startY: number, endX: number, endY: number;

  const [direction, setDirection] = useState<Direction>("");

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
    setDirection("");

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

    setTimeout(() => setDirection(text), 1);
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
