
/**
 * Format bytes to human readable format
 * @param fn - target function
 * @signature
 *    P.formatBytes(bytes)
 * @example
 *    P.formatBytes(12457150) // => 11.88MB
 * @category Utility, Pipe
 */
export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}
