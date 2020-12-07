/**
 * Generates non cryptographic UUID
 * @example
 * P.uuidv4() //=> aecad060-0bb7-4567-af08-4dfe5f46d130
 * @category Utility
 */
export function uuidv4(): string {
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // tslint:disable
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  // tslint:enable
}
