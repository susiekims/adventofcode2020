const { part1 } = require("./part1");

test("it should get the correct sample answer", () => {
  const testInputs = [1721, 979, 366, 299, 675, 1456];
  expect(part1(testInputs, 2020)).toBe(514579);
});

test("the match should not be the same number", () => {
  const testInputs = [1010, 2019, 1];
  expect(part1(testInputs, 2020)).toBe(2019);
});
