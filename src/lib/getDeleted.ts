type ObjectWithKey<K extends string | number | symbol, V> = {
  [key in K]: V;
};

function getDeletedItems<T extends ObjectWithKey<K, V>, K extends keyof T, V>(
  originalList: T[],
  newList: T[],
  keyToCheck: K
): { deleted: T[]; remaining: T[] } {
  const deletedItems: T[] = [];
  const remainingItems = originalList.filter((originalObj) => {
    const foundIndex = newList.findIndex(
      (newObj) => newObj[keyToCheck] === originalObj[keyToCheck]
    );

    if (foundIndex === -1) {
      deletedItems.push(originalObj);
      return false;
    }

    return true;
  });

  return { deleted: deletedItems, remaining: remainingItems };
}

export default getDeletedItems;
