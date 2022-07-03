// stackoverflow.com/questions/44134212/best-way-to-flatten-js-object-keys-and-values-to-a-single-depth-array

export function flattenObject(
  obj: Record<string, unknown>,
  options?: {
    separator?: string;
  }
) {
  const defaultOptions = {
    separator: '.',
    ...(options || {}),
  };
  function flt(
    obj: any,
    prefix = '',
    result: null | Record<string, unknown> = null
  ) {
    result = result || {};

    // Preserve empty objects and arrays, they are lost otherwise
    if (
      prefix &&
      typeof obj === 'object' &&
      obj !== null &&
      Object.keys(obj).length === 0
    ) {
      result[prefix] = Array.isArray(obj) ? [] : {};
      return result;
    }

    prefix = prefix ? prefix + `${defaultOptions.separator}` : '';

    for (const i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        if (typeof obj[i] === 'object' && obj[i] !== null) {
          // Recursion on deeper objects
          flt(obj[i], prefix + i, result);
        } else {
          result[prefix + i] = obj[i];
        }
      }
    }
    return result;
  }

  return flt(obj);
}

export function unFlattenObject(obj: Record<string, unknown>) {
  const result = {};
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      const keys = i.match(/^\.+[^.]*|[^.]*\.+$|(?:\.{2,}|[^.])+(?:\.+$)?/g); // Just a complicated regex to only match a single dot in the middle of the string
      if (keys == null) return result;
      keys.reduce((r: any, e, j) => {
        return (
          r[e] ||
          (r[e] = isNaN(Number(keys[j + 1]))
            ? keys.length - 1 === j
              ? obj[i]
              : {}
            : [])
        );
      }, result);
    }
  }
  return result;
}
