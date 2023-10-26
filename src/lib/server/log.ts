// Write terminal output with colors


/**
 * Enum representing log levels.
 * @enum {number}
 * @readonly
 * @property {number} INFO - Informational log level.
 * @property {number} OK - Success or positive log level.
 * @property {number} ERROR - Error log level.
 * @property {number} WARN - Warning log level.
 */
export enum LEVEL {
    INFO, OK, ERROR, WARN
}

/**
 * Logs a message to the console with an optional log level.
 *
 * @param {string} message - The message to be logged.
 * @param {LEVEL} [level=LEVEL.INFO] - The log level. Defaults to LEVEL.INFO.
 * @returns {void}
 */
export default function consoleLog(message: string, level: LEVEL = LEVEL.INFO): void {
    // Get current time
    let timeStamp: string = new Date().toLocaleTimeString();

    // Log message
    switch (level) {
        case LEVEL.INFO:
            console.log(`-> ${timeStamp} [ ${message} ]`);
            break;
        case LEVEL.OK:
            console.log(`\x1b[32m-> ${timeStamp} [ ${message} ] \x1b[0m`);
            break;
        case LEVEL.ERROR:
            console.error(`\x1b[31m-> ${timeStamp} [ ${message} ] \x1b[0m`);
            break;
        case LEVEL.WARN:
            console.warn(`\x1b[33m-> ${timeStamp} [ ${message} ] \x1b[0m`);
            break;
    }
}