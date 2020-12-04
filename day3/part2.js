/*
--- Part Two ---
Time to check the rest of the slopes - you need to minimize the probability
of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the 
following slopes, you start at the top-left corner and traverse the map all 
the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; 
multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of 
the listed slopes?
*/

const part2 = (map, slopeX, slopeY) => {
  let i = 0;
  let j = 0;
  let trees = 0;

  while (i < map.length) {
    if (map[i][j] === "#") {
      trees++;
    }

    let go = true;
    for (let x = 1; x <= slopeX; x++) {
      const target = map[0].length - x;
      if (j === target) {
        j = slopeX - x;
        go = false;
      }
    }
    if (go) {
      j += slopeX;
    }

    i += slopeY;
  }
  return trees;
};

const testInput = [
  [".", ".", "#", "#", ".", ".", ".", ".", ".", ".", "."],
  ["#", ".", ".", ".", "#", ".", ".", ".", "#", ".", "."],
  [".", "#", ".", ".", ".", ".", "#", ".", ".", "#", "."],
  [".", ".", "#", ".", "#", ".", ".", ".", "#", ".", "#"],
  [".", "#", ".", ".", ".", "#", "#", ".", ".", "#", "."],
  [".", ".", "#", ".", "#", "#", ".", ".", ".", ".", "."],
  [".", "#", ".", "#", ".", "#", ".", ".", ".", ".", "#"],
  [".", "#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
  ["#", ".", "#", "#", ".", ".", ".", "#", ".", ".", "."],
  ["#", ".", ".", ".", "#", "#", ".", ".", ".", ".", "#"],
  [".", "#", ".", ".", "#", ".", ".", ".", "#", ".", "#"],
];

const fs = require("fs");
const input = fs
  .readFileSync("day3/input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

console.log(
  slopes
    .map(([slopeX, slopeY]) => {
      console.log(part2(input, slopeX, slopeY));
      return part2(input, slopeX, slopeY);
    })
    .reduce((a, b) => a * b, 1)
);
