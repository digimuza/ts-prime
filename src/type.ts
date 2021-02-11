// from https://github.com/ramda/ramda/blob/master/source/type.js
/**
 * Gives a single-word string description of the (native) type of a value, returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not attempt to distinguish user Object types any further, reporting them all as 'Object'.
 * @param val
 * @signature
 *    P.type(obj)
 * @example
 *    P.type({}); //=> "Object"
 *    P.type(1); //=> "Number"
 *    P.type(false); //=> "Boolean"
 *    P.type('s'); //=> "String"
 *    P.type(null); //=> "Null"
 *    P.type([]); //=> "Array"
 *    P.type(/[A-z]/); //=> "RegExp"
 *    P.type(() => {}); //=> "Function"
 *    P.type(undefined); //=> "Undefined"
 *    P.type(new Date()); //=> "Date"
 *    P.type(new MyClass()); // => "MyClass" 
 * @category Utility
 */
export function type(val: any): string {
  return (val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1));
}
