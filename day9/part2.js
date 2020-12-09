/*
--- Part Two ---
The final step in breaking the XMAS encryption relies on the invalid number you just found: 
you must find a contiguous set of at least two numbers in your list which sum to the invalid 
number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576

In this list, adding up all of the numbers from 15 through 40 produces the invalid number 
from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous 
range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?
*/

const { testInput, input, part1 } = require("./part1");

const findArray = (input, target) => {
  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    let arr = [];

    for (let j = i; j < input.length; j++) {
      if (input[j] + sum <= target) {
        arr.push(input[j]);
        sum += input[j];
      }
    }

    if (sum === target) {
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return min + max;
    }
  }
};

const part2 = (inputs, preamble) => {
  const invalidNumber = part1(inputs, preamble);
  return findArray(inputs, invalidNumber);
};

console.log(part2(input, 25)); // 169521051