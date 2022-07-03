import { capitalize } from './capitalize';
import { filter } from './filter';
import { flatMap } from './flatMap';
import { map } from './map';
import { normalizeString } from './normalizeString';
import { pipe } from './pipe';
/**
 * Convert any string to nameCased variant
 * @param str - the string
 * @param to - convert string to 'PascalCase' | 'camelCase' | 'snake_case' | 'kebab-case' | 'Train-Case'
 * @signature
 *    P.convertStringToNameCase(str, to);
 * @example
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'PascalCase') // -> Super0BallCup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'camelCase') // -> super0BallCup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'snake_case') // -> super_0_ball_cup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'kebab-case') // -> super-0-ball-cup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'Train-Case') // -> Super-0-Ball-Cup
 * @category String
 */
export function convertStringToNameCase(
  str: string,
  to: 'PascalCase' | 'camelCase' | 'snake_case' | 'kebab-case' | 'Train-Case'
): string {
  const result = pipe(
    str.split(' '),
    flatMap(q => q.split(/(?=[A-Z])| |-/)),
    map(w => normalizeString(w)),
    filter(q => !!q)
  );
  switch (to) {
    case 'kebab-case':
      return result.map(c => c.toLowerCase()).join('-');
    case 'PascalCase':
      return result.map(c => capitalize(c.toLowerCase())).join('');
    case 'Train-Case':
      return result.map(c => capitalize(c.toLowerCase())).join('-');
    case 'snake_case':
      return result.map(c => c.toLowerCase()).join('_');
    case 'camelCase':
      return result
        .map((c, index) => {
          // tslint:disable-next-line:no-if-statement
          if (index === 0) {
            return c.toLowerCase();
          }

          return capitalize(c.toLowerCase());
        })
        .join('');
  }
}
