export const partition: <T>(ts: T[], size: number) => T[][] = <T>(
  ts: T[],
  size: number
) => {
  return ts.reduce((acc, t, i) => {
    const [curPartition, donePartitions] =
      i % size === 0
        ? [[], acc]
        : [acc[acc.length - 1], acc.slice(0, acc.length - 1)];
    return donePartitions.concat([curPartition.concat([t])]);
  }, [] as T[][]);
};
