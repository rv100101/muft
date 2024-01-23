type ObjectWithKey<K extends string | number | symbol, V> = {
  [key in K]: V;
};

function removeDuplicates<
  T extends ObjectWithKey<K, string>,
  K extends keyof T,
>(arr: T[], key: K): T[] {
  // Create an object to keep track of unique keys
  const uniqueKeys: Record<string, boolean> = {};

  if (typeof arr !== "object") {
    return arr;
  }

  if (arr.length == 0) {
    return arr;
  }
  // Filter the array to include only the first occurrence of each key
  const result = arr.filter((obj) => {
    const keyValue = obj[key];
    if (!uniqueKeys[keyValue]) {
      uniqueKeys[keyValue] = true;
      return true;
    }
    return false;
  });

  return result;
}

export default removeDuplicates;
