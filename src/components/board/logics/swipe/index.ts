import { cloneDeep } from "lodash";
import { Direction } from "./interface";
import { reverseTranspose, transposeArray } from "./tools";

function mergeAndTransform(arr: number[]) {
  // Step 1: Create a new array to hold the results
  const result: number[] = [0, 0, 0, 0];

  // Step 2: Initialize a pointer for the result array
  let index = 0;

  // Step 3: Iterate through the input array
  for (let i = 0; i < arr.length; i++) {
    // If the current element is not zero
    if (arr[i] !== 0) {
      // Check if the next element is the same
      if (i < arr.length - 1 && arr[i] === arr[i + 1]) {
        // Merge the two elements
        result[index] = arr[i] * 2;
        index++;
        // Skip the next element since it's merged
        i++;
      } else {
        // If no merge, just move the current element
        result[index] = arr[i];
        index++;
      }
    }
  }

  const [first, second, third, fourth] = arr;

  if (first === third && !second) return [first + third, fourth, 0, 0];
  if (first === fourth && !second && !third) return [first + fourth, 0, 0, 0];
  if (second === fourth && !first && !third) return [second + fourth, 0, 0, 0];

  return result;
}

function changeRandomZero(arr: number[][]) {
  // Flatten the 2D array to make it easier to work with
  const flatArray = arr.flat();

  // Find the indices of all zeros
  const zeroIndices = flatArray
    .map((value, index) => (value === 0 ? index : -1))
    .filter((index) => index !== -1);

  // If there are no zeros, return the original array
  if (zeroIndices.length === 0) {
    return arr;
  }

  // Randomly select one of the zero indices
  const randomIndex =
    zeroIndices[Math.floor(Math.random() * zeroIndices.length)];

  // Generate a random number to determine whether to change to 2 or 4
  const randomValue = Math.random();
  const newValue = randomValue < 0.95 ? 2 : 4; // 95% chance for 2, 5% chance for 4

  // Update the selected index in the flattened array
  flatArray[randomIndex] = newValue;

  // Convert the flat array back to a 2D array
  const updatedArray = [];
  for (let i = 0; i < flatArray.length; i += 4) {
    updatedArray.push(flatArray.slice(i, i + 4));
  }

  return updatedArray;
}

const swipeArray = (array: number[][], direction: Direction) => {
  const arr = (() => {
    const clonedArr = cloneDeep(array);
    if (direction === "up") return transposeArray(clonedArr);
    if (direction === "down") return transposeArray(clonedArr.reverse());
    if (direction === "right") return clonedArr.map((item) => item.reverse());

    return array;
  })();

  const result = (() => {
    const clonedResult = cloneDeep(arr).map(mergeAndTransform);
    if (direction === "up") return reverseTranspose(clonedResult);
    if (direction === "down") return reverseTranspose(clonedResult).reverse();
    if (direction === "right")
      return clonedResult.map((item) => item.reverse());

    return clonedResult;
  })();

  return changeRandomZero(result);
};

export default swipeArray;
