

/**
 * Return random number between two numbers
 * 
 * @param min - minimum
 * @param max - maximum
 * @param random - Random number generation function, by default function uses Math.random 
 */
export function randomIntFromInterval(min: number, max: number, random: () => number = Math.random) { // min and max included 
  return Math.floor(random() * (max - min + 1) + min);
}

/**
 * Picks random item in array
 * 
 * @param arr - Array to pick
 * @param random - Random number generation function, by default function uses Math.random 
 */
export function randomItemInArray<T>(arr: T[], random: () => number = Math.random) {
    const random_number = randomIntFromInterval(0, arr.length - 1, random)
    return arr[random_number]
}