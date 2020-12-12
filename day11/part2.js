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

const countNeighbours = (input, row, col) => {
  let count = 0;
  //top
  for (let i = row - 1; i >= 0; i--) {
    // input[i][col] = "T";
    if (input[i][col] == "L") {
      break;
    }
    if (input[i][col] === "#") {
      count++;
    }
  }

  //bottom
  for (let i = row + 1; i < input.length; i++) {
    // input[i][col] = "B";
    if (input[i][col] == "L") {
      break;
    }
    if (input[i][col] === "#") {
      count++;
      break;
    }
  }

  //left
  for (let j = col - 1; j >= 0; j--) {
    // input[row][j] = "L";
    if (input[row][j] == "L") {
      break;
    }
    if (input[row][j] === "#") {
      count++;
      break;
    }
  }

  // right
  for (let j = col + 1; j < input[0].length; j++) {
    // input[row][j] = "R";
    if (input[row][j] == "L") {
      break;
    }
    if (input[row][j] === "#") {
      count++;
      break;
    }
  }

  // top left
  for (let i = row - 1; i >= 0; i--) {
    // input[i][i] = "1";
    if (input[i][i] == "L") {
      break;
    }
    if (input[i][i] === "#") {
      count++;
      break;
    }
  }

  // bottom right
  for (let j = col + 1; j < input[0].length; j++) {
    // input[j][j] = "4";
    if (input[j][j] == "L") {
      break;
    }
    if (input[j][j] === "#") {
      count++;
      break;
    }
  }

  // bottom left
  let i = row + 1;
  let j = col - 1;
  while (i < input.length && j >= 0) {
    // input[i][j] = "3";
    if (input[i][j] == "L") {
      break;
    }
    if (input[i][j] === "#") {
      count++;
      break;
    }
    i++;
    j--;
  }

  // top right
  let j2 = row + 1;
  let i2 = col - 1;
  while (j2 < input.length && i2 >= 0) {
    // input[i2][j2] = "2";
    if (input[i2][j2] == "L") {
      break;
    }
    if (input[i2][j2] === "#") {
      count++;
      break;
    }
    i2--;
    j2++;
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
      if (input[row][col] === "#" && countNeighbours(input, row, col) >= 5) {
        copy[row][col] = "L";
        count--;
      }

      if (input[row][col] === "L" && countNeighbours(input, row, col) === 0) {
        copy[row][col] = "#";
        count++;
      }
    }
  }

  // if (map[count]) {
  return count;
  // }

  // map[count] = true;
  // return part1(copy);
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

console.log(
  part1([
    ["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", ".", "#", "#"],
    ["#", ".", "#", ".", "#", ".", ".", "#", ".", "."],
    ["#", "#", "#", "#", ".", "#", "#", ".", "#", "#"],
    ["#", ".", "#", "#", ".", "#", "#", ".", "#", "#"],
    ["#", ".", "#", "#", "#", "#", "#", ".", "#", "#"],
    [".", ".", "#", ".", "#", ".", ".", ".", ".", "."],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", "#", "#", "#", "#", "#", "#", ".", "#"],
    ["#", ".", "#", "#", "#", "#", "#", ".", "#", "#"],
  ])
);
