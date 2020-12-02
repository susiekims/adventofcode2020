/*
Before you leave, the Elves in accounting just need you to fix your expense 
report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then 
multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying 
them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum 
to 2020; what do you get if you multiply them together?
*/

const part1 = (inputs, sum) => {
  const map = {};

  for (let i = 0; i < inputs.length; i++) {
    const match = sum - inputs[i];

    if (map[match]) {
      return match * inputs[i];
    }

    map[inputs[i]] = match;
  }
};

const fs = require("fs");
const inputs = fs
  .readFileSync("day1/input.txt", "utf8")
  .split("\n")
  .map((item) => Number(item));

const solution = part1(inputs, 2020);

console.log(solution);

module.exports = { part1 };
