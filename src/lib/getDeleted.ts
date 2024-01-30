type ObjectWithKey<K extends string | number | symbol, V> = {
  [key in K]: V;
};

function getDeletedItems<T extends ObjectWithKey<K, V>, K extends keyof T, V>(
  originalList: T[],
  newList: T[],
  keyToCheck: K
): T[] {
  const deletedItems: T[] = [];
  originalList.filter((originalObj) => {
    const foundIndex = newList.findIndex(
      (newObj) => newObj[keyToCheck] === originalObj[keyToCheck]
    );

    if (foundIndex === -1) {
      deletedItems.push(originalObj);
      return false;
    }

    return true;
  });
  return deletedItems;
}

export default getDeletedItems;
