export function checkDirtyFields(
  keys: string[],
  errorObj: Record<string, boolean>
): boolean {
  for (const key of keys) {
    if (!(key in errorObj)) {
      return false;
    }
  }
  return true;
}

export function atLeastOneDirty(
  keys: string[],
  errorObj: Record<string, boolean>
): boolean {
  for (const key of keys) {
    if (key in errorObj) {
      return true;
    }
  }
  return false;
}
