export function charByteCounter(char: string) {
  let ch = char.charCodeAt(0);
  let counter = 0;
  while (ch) {
    counter++;
    ch = ch >> 8;
  }

  return counter;
}
