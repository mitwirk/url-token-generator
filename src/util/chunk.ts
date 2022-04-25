import { charByteCounter } from "./charByteCounter";

export function* chunkIterator(
  text: string,
  maxBytes: number
): IterableIterator<string> {
  let byteCounter = 0;
  let buildString = "";

  for (const char of text) {
    const bytes = charByteCounter(char);

    if (byteCounter + bytes > maxBytes) {
      yield buildString;

      buildString = char;
      byteCounter = bytes;
      continue;
    }

    buildString += char;
    byteCounter += bytes;
  }

  yield buildString;
}
