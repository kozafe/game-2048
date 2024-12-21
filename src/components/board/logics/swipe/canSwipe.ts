import cloneDeep from "lodash/cloneDeep";
import { transposeArray } from "./tools";
import { Direction } from "./interface";

const hasGapDecider = (arr: number[]) => {
  const [first, second, third, fourth] = arr;

  if (first && second && third && fourth) return false;
  if (first && second && third && !fourth) return false;
  if (first && second && !third && fourth) return true;
  if (first && second && !third && !fourth) return false;
  if (first && !second && third && fourth) return true;
  if (first && !second && third && !fourth) return true;
  if (first && !second && !third && fourth) return true;
  if (first && !second && !third && !fourth) return false;
  if (!first && second && third && fourth) return true;
  if (!first && second && third && !fourth) return true;
  if (!first && second && !third && fourth) return true;
  if (!first && second && !third && !fourth) return true;
  if (!first && !second && third && fourth) return true;
  if (!first && !second && third && !fourth) return true;
  if (!first && !second && !third && fourth) return true;
  if (!first && !second && !third && !fourth) return false;
  return false;
};

const canSwipeDecider = (direction: Direction, array: number[][]) => {
  let canSwipe = false;

  const arr = (() => {
    const clonedArr = cloneDeep(array);
    if (direction === "up") return transposeArray(clonedArr);
    if (direction === "down") return transposeArray(clonedArr.reverse());
    if (direction === "right") return clonedArr.map((item) => item.reverse());

    return array;
  })();

  arr.forEach((array) => {
    if (canSwipe) return;

    const hasGap = hasGapDecider(array);

    canSwipe = hasGap;
  });

  return canSwipe;
};

export default canSwipeDecider;
