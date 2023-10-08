/**
 * Extracts the pathname from a URL object.
 *
 * @param {Object} options - An object containing a URL.
 * @param {URL} options.url - The URL object from which to extract the pathname.
 * @returns {Object} An object with the extracted URL pathname.
 */
export function load({url}: any): { url: any } {
    return {
        url: url.pathname,
    }
}