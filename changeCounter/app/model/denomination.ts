export default interface Denomination {
  hundreds: number;
  fifties: number;
  twenties: number;
  tens: number;
  fives: number;
  ones: number;
  quarters: number;
  dimes: number;
  nickels: number;
  pennies: number;
  total: number;
  [key: string]: number; // Allow for string indexing
}
