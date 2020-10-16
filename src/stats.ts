import { purry } from "./purry";

export interface Stats { min: number, max: number, 
    arithmetic_mean: number, 
    median: number, 
    geometric_mean: number, 
    middle: number, 
    quadratic_mean: number,
    sum: number 
}


function _stats<X>(data: ReadonlyArray<X>, fn: (q: X) => number): Stats {
    const numbers = data.map(fn)
    function calcMedian(values: ReadonlyArray<number>) {
        if (values.length === 0) return 0;
        [...values].sort((a, b) => {
            return a - b;
        });

        const half = Math.floor(values.length / 2);
        if (values.length % 2)
            return values[half];

        return (values[half - 1] + values[half]) / 2.0;
    }  
    const min = Math.min(...numbers)
    const max = Math.max(...numbers)
    const sum = numbers.reduce((acc, c) => acc + c, 0)
    return {
        sum,
        middle: (max + min) / 2,
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        arithmetic_mean: sum / numbers.length,
        geometric_mean: numbers.reduce((acc, c) => acc * (c === 0 ? 1 : c), 1) / numbers.length,
        median: calcMedian(numbers),
        quadratic_mean: Math.sqrt(numbers.map((q) => Math.pow(q, 2)).reduce((acc, c)=> acc + c, 0))
    }
}
export function stats<T>(data: readonly T[], fn: (item: T) => number): Stats;
export function stats<T>(fn: (item: T) => number): (array: readonly T[]) => Stats;
export function stats() {
    return purry(_stats, arguments);
}
