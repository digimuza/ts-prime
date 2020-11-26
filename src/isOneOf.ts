
export function isOneOf<T extends string | number | boolean>(
    value: string | number | boolean | undefined,
    array: ReadonlyArray<T>
): value is T {
    return typeof value !== 'undefined' && array.indexOf(value as T) !== -1
}
