/**
 * Extracts the pathname from a URL object.
 *
 * @param {object} options - An object containing URL information.
 * @param {URL} options.url - The URL object from which to extract the pathname.
 * @returns {object} - An object containing the extracted URL pathname.
 * @property {string} url.pathname - The pathname part of the URL.
 */
export function load({url}: any): { url: any } {
    return {
        url: url.pathname
    }
}