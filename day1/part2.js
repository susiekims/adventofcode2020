/*
The Elves in accounting are thankful for your help; one of them even offers you a 
starfish coin they had left over from a past vacation. They offer you a second one 
if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 
675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

const testInputs = [1721, 979, 366, 299, 675, 1456];

const part2 = (inputs, sum) => {
  for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs.length; j++) {
      for (let k = 0; k < inputs.length; k++) {
        if (inputs[i] + inputs[j] + inputs[k] === sum) {
          return inputs[i] * inputs[j] * inputs[k];
        }
      }
    }
  }
};

function threeSum2(arr, target) {
  arr.sort((a, b) => {
    return a - b;
  });

  let result;

  for (let i = 0; i < arr.length - 2; i++) {
    let j = i + 1;
    let k = arr.length - 1;

    if (i > 0 && arr[i] === arr[i - 1]) continue;

    while (j < k) {
      let sum = arr[i] + arr[j] + arr[k];

      if (sum < target) {
        j++;
      } else if (sum > target) {
        k--;
      } else {
        result = arr[i] * arr[j] * arr[k];
        while (arr[j] === arr[j + 1]) j++;
        while (arr[k] === arr[k - 1]) k--;
        j++;
        k--;
      }
    }
  }
  return result;
}

const fs = require("fs");
const inputs = fs
  .readFileSync("day1/input.txt", "utf8")
  .split("\n")
  .map((item) => Number(item));


console.log(part2(inputs, 2020));
console.log(threeSum2(inputs, 2020));
