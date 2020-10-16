export const partition: <T>(ts: T[], size: number) => T[][] = <T>(
  ts: T[],
  size: number
) => {
  return ts.reduce((acc, t, i) => {
    const curPartition = i % size === 0 ? [] : acc[acc.length - 1];
    return acc.slice(0, acc.length - 1).concat([curPartition.concat([t])]);
  }, [] as T[][]);
};
