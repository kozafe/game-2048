import { useSearchParams } from "next/navigation";
import { Direction } from "./interface";
import swipeArray from ".";
import { cloneDeep } from "lodash";
import { transposeArray } from "./tools";

const counterRightDirection = (
  animation: Direction,
  row: number,
  col: number,
  arr: number[][],
  result: number[][]
) => {
  if (!animation) return 0;

  // merge direction: right

  const array = arr[row];
  const number = array[col];

  const resultArray = result[row];

  if (!number) return 0;

  const unmoved =
    (number === resultArray[col] &&
      number !== resultArray[col + 1] &&
      number + array[col + 1] !== resultArray[col + 1]) ||
    col === 3;

  // 2022 handles xx2x
  const is2022 = !array[1] && array[2] === array[0] && array[2] === array[3];

  if (col === 2 && is2022) return 1;

  // 2022 handles 2xxx
  if (!col && is2022) return 2;

  //2220 handles xx2x
  if (col === 2 && array[0] === array[1] && array[1] === array[2] && !array[3])
    return 1;

  if (unmoved) return 0;

  // 2240 handles 2xxx
  if (!col && !array[3] && array[0] === array[1]) return 2;

  // 2200 handles 2xxx
  if (!col && array[0] === array[1] && !array[2] && !array[3]) return 3;

  // 2200 handles x2xx
  if (col === 1 && array[0] === array[1] && !array[2] && !array[3]) return 2;

  // 2024 handles xx2x
  if (!array[1] && array[3] && array[0] === array[2] && col === 2) return 0;

  // 2002 handles 2xxx
  if (array[0] === number && array[3] === number && !array[1] && !array[2])
    return 3;

  // 2004 handles 2xxx or xxx4
  if (
    array[3] &&
    array[0] &&
    !array[1] &&
    !array[2] &&
    (number === array[0] || number === array[0])
  )
    return 2;

  // 2000 handles 2xxx
  if (array[0] === number && !array[1] && !array[2] && !array[3]) return 3;

  // 2400 handles x4xx
  if (number !== array[col - 1] && !array[2] && !array[3]) return 2;

  // 2240 handles x2xx
  if (number + array[col - 1] === resultArray[col + 1]) {
    return 1;
  }

  // 2240 handles 2xxx
  if (number + array[col + 1] === resultArray[col + 2]) {
    return 1;
  }

  // 2020 handles 2xxx
  if (!array[1] && !array[3] && number === array[col + 2]) return 3;

  // 2020 handles xx2x
  if (!array[1] && number === array[col - 2]) return 1;

  if (
    number === resultArray[col + 1] ||
    resultArray[col + 1] === number + array[col + 1]
  )
    return 1;
  if (
    number === resultArray[col + 2] ||
    resultArray[col + 2] === array[col + 2] + number
  )
    return 2;
  if (
    number === resultArray[col + 3] ||
    resultArray[col + 3] === array[col + 3] + number
  )
    return 3;

  return 0;
};

const useAnimationLogics = (arr: number[][]) => {
  const animation = useSearchParams().get("animation") as Direction;

  const result = swipeArray(arr, animation);

  const boxCounter = (row: number, col: number) => {
    if (!arr[row][col]) return 0;

    const arrayFormatter = (arr: number[][]) => {
      const clonedArr = cloneDeep(arr);

      if (animation === "up") return transposeArray(clonedArr.reverse()); // suram
      if (animation === "down") return transposeArray(clonedArr);

      if (animation === "left")
        return clonedArr.reverse().map((array) => array.reverse());
      return clonedArr;
    };

    const { col: colResult, row: rowResult } = (() => {
      const reverseIndex = (number: number) => {
        if (number === 3) return 0;
        if (number === 2) return 1;
        if (number === 1) return 2;
        return 3;
      };

      if (animation === "up")
        return {
          row: reverseIndex(col),
          col: reverseIndex(row),
        };
      if (animation === "down") return { row: reverseIndex(col), col: row }; // suram

      if (animation === "left")
        return {
          row: reverseIndex(row),
          col: reverseIndex(col),
        };
      return { row, col };
    })();

    return counterRightDirection(
      animation,
      rowResult,
      colResult,
      arrayFormatter(arr),
      arrayFormatter(result)
    );
  };

  return boxCounter;
};

export default useAnimationLogics;
