export const registers = `Register A: 47792830
Register B: 0
Register C: 0`
  .match(/(\d+)/g)!
  .map(Number);

export const program = `Program: 2,4,1,5,7,5,1,6,4,3,5,5,0,3,3,0`
  .match(/(\d+)/g)!
  .map(Number);