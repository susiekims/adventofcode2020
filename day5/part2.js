/*
--- Part Two ---
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding 
pass in your list. However, there's a catch: some of the seats at the very front 
and back of the plane don't exist on this aircraft, so they'll be missing from your 
list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours 
will be in your list.

What is the ID of your seat?
*/

const { getSeatId, input } = require("./part1");

const part2 = (input) => {
  const seats = input.map((seat) => getSeatId(seat)).sort((a, b) => a - b);

  for (let i = 1; i < input.length - 1; i++) {
    const current = seats[i]
    const next = seats[i+1]
    if (current !== (next - 1)) {
      return seats[i] + 1
    }
  }
};

console.log(part2(input))