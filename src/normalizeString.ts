

/**
 * Converts characters like ĖČĘĄ -> ecea, removes non letter and non number characters
 * @param str the string
 * @signature
 *    R.normalizeString(str);
 * @example
 *    R.normalizeString("Super#@! ===-0- ball %%% cup") // => super0ballcup
 * @data_first
 * @category String
 */
export function normalizeString(str: string) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/gm, '')
}