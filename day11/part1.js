/*
--- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes 
directly to the tropical island where you can finally start your vacation. As you reach the waiting 
area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty 
sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied 
seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable 
and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a 
given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The 
following rules are applied to every seat simultaneously:

- If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
- If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
- Otherwise, the seat's state does not change.
- Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##

After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##

This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##

At this point, something interesting happens: the chaos stabilizes and further applications of these 
rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many 
seats end up occupied?
*/

const countNeighbours = (input, row, col) => {
  let count = 0;
  const neighbours = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  for (let i = 0; i < neighbours.length; i++) {
    const row = neighbours[i][0];
    const col = neighbours[i][1];
    count += input[row][col] === "#" ? 1 : 0;
  }

  return count;
};

const map = {};
const part1 = (input) => {
  let count = 0;
  const copy = JSON.parse(JSON.stringify(input));

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === "#") {
        count++;
      }

      if (input[row][col] === "#" && countNeighbours(input, row, col) >= 4) {
        copy[row][col] = "L";
        count--;
      }

      if (input[row][col] === "L" && countNeighbours(input, row, col) === 0) {
        copy[row][col] = "#";
        count++;
      }
    }
  }

  if (map[count]) {
    return count;
  }

  map[count] = true;
  return part1(copy);
};

const testInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
  .split("\n")
  .map((row) => row.split(""));

const padInput = (input) => {
  const emptyRow = [new Array(input[0].length + 2).fill(0)];
  return emptyRow.concat(input.map((row) => [0, ...row, 0])).concat(emptyRow);
};

const fs = require("fs");
const input = fs
  .readFileSync("day11/input.txt", "utf8")
  .split("\n")
  .map((row) => row.split(""));

console.time("part1");
console.log(part1(padInput(input)));
console.timeEnd("part1");

module.exports = { input, padInput, testInput };
