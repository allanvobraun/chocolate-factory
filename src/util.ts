export function range(start: number, stop?: number, step?: number): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  const newStep = step ?? 1;
  return Array.from({ length: (stop - start) / newStep }, (_, i) => start + i * newStep);
}
