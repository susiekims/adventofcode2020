/*
--- Part Two ---
As soon as people start to arrive, you realize your mistake. People don't just care about 
adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first 
seat in each of those eight directions. For example, the empty seat below would see eight occupied 
seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....

The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............

The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.

Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied 
seats for an occupied seat to become empty (rather than four or more from the previous rules). The 
other rules still apply: empty seats that see no occupied seats become occupied, seats matching no 
rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as 
follows:

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

#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#

#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#

Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this 
occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium 
is reached, how many seats end up occupied?
*/

const { padInput, input, testInput } = require("./part1");

const countVisible = (input, row, col) => {
  let count = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  directions.forEach(([x, y]) => {
    let i = row + x;
    let j = col + y;
    while (i >= 0 && j >= 0 && i < input.length && i < input[0].length) {
      if (input[i][j] === "#") {
        count++;
        break;
      }

      if (input[i][j] === ".") {
        i = i + x;
        j = j + y;
        continue;
      }
      break;
    }
  });

  return count;
};

const map = {};
const part2 = (input) => {
  let count = 0;
  const copy = JSON.parse(JSON.stringify(input));

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === "#") {
        count++;
      }

      if (input[row][col] === "#" && countVisible(input, row, col) >= 5) {
        copy[row][col] = "L";
        count--;
      }

      if (input[row][col] === "L" && countVisible(input, row, col) === 0) {
        copy[row][col] = "#";
        count++;
      }
    }
  }

  const key = JSON.stringify(copy);

  if (map[key]) {
    return map[key];
  }
  map[key] = count;
  return part2(copy);
};

console.time("part2");
console.log(part2(padInput(input)));
console.timeEnd("part2");
