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

export const index: <T, K>(ts: T[], by: (t: T) => K) => Map<K, T[]> = <T, K>(
  ts: T[],
  by: (t: T) => K
) => {
  return ts.reduce((map, t) => {
    const key = by(t);
    const group = map.get(key) || [];

    return new Map(map).set(key, group.concat(t));
  }, new Map());
};

export const choices: <T>(array: T[], n: number) => T[] = (array, n) => {
  return Array.from(Array(n).keys())
    .map((_) => Math.floor(Math.random() * array.length))
    .map((index) => array[index]);
};
