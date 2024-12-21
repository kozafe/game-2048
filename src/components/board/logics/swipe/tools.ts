export const transposeArray = (array: number[][]) => {
  const firstArr: number[] = [];
  const secondArr: number[] = [];
  const thirdArr: number[] = [];
  const fourthArr: number[] = [];

  array.forEach((arr) => {
    const [first, second, third, fourth] = arr;
    firstArr.push(fourth);
    secondArr.push(third);
    thirdArr.push(second);
    fourthArr.push(first);
  });

  return [firstArr, secondArr, thirdArr, fourthArr];
};
export const reverseTranspose = (array: number[][]) =>
  transposeArray(array.map((arr) => arr.reverse()).reverse());
