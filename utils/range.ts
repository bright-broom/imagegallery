function range(end: number): number[];
function range(start: number, end: number): number[];
function range(startOrEnd: number, maybeEnd?: number): number[] {
  const start = maybeEnd === undefined ? 0 : startOrEnd;
  const end = maybeEnd === undefined ? startOrEnd : maybeEnd;
  const output: number[] = [];

  for (let i = start; i < end; i += 1) {
    output.push(i);
  }

  return output;
}

export { range };
