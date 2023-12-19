type ObjectWithKey<K extends string | number | symbol, V> = {
  [key in K]: V;
};

function removeExistingData<
  T extends ObjectWithKey<K, V>,
  K extends keyof T,
  V,
>(sourceList: T[], targetList: T[], keyToCheck: K): T[] {
  const notInList = sourceList.filter(
    (sourceObj) =>
      !targetList.some(
        (targetObj) => targetObj[keyToCheck] === sourceObj[keyToCheck]
      )
  );
  return notInList;
}

export default removeExistingData;
