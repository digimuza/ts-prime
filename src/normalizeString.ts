

/**
 * Converts characters like ĖČĘĄ -> ecea, removes non letter and non number characters
 */
export function normalizeString(str: string) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/gm, '')
}