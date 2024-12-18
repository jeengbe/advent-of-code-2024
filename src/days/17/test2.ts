export const registers = `Register A: 117440
Register B: 0
Register C: 0`
  .match(/(\d+)/g)!
  .map(Number);

export const program = `Program: 0,3,5,4,3,0`.match(/(\d+)/g)!.map(Number);
