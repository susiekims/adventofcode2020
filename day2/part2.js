/*
--- Part Two ---
While it appears you validated the passwords correctly, they don't seem to be what the 
Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy 
rules from his old job at the sled rental place down the street! The Official Toboggan 
Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first 
character, 2 means the second character, and so on. (Be careful; Toboggan Corporate 
Policies have no concept of "index zero"!) Exactly one of these positions must contain 
the given letter. Other occurrences of the letter are irrelevant for the purposes of 
policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

How many passwords are valid according to the new interpretation of the policies?

*/
const testInputs = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

const part1 = (passwords) => {
  const formattedPasswords = passwords.map((password) =>
    password.split(/\s|,|-|:\s/)
  );

  return formattedPasswords.filter(([position1, position2, char, password]) => {
    let count = 0;

    if (password.charAt(position1 - 1) === char) {
      count++;
    }
    if (password.charAt(position2 - 1) === char) {
      count++;
    }
    
    return count === 1;
  }).length;
};

const fs = require("fs");
const inputs = fs.readFileSync("day2/input.txt", "utf8").split("\n");

console.log(part1(inputs));
