const dateSeperator = '/';
const timeSeperator = ':';

/**
 * Convert a date object to a full string notation.
 * @param date - the date object.
 * @param seperator - optional preferred seperator, defaut is / .
 * @returns - a string notation of the date with seperators.
 */
export const DateToStringDate = (date: Date, seperator?: string): string => {
    const thisSeperator = seperator || dateSeperator;
    return date.getDate() + thisSeperator + date.getMonth() + thisSeperator + date.getFullYear();
}

/**
 * Convert a date object to a full string notation.
 * @param date - the date object.
 * @param seperator - optional preferred seperator, defaut is / .
 * @returns - a string notation of the date with seperators.
 */
export const DateToStringTime = (date: Date, seperator?: string): string => {
    const thisSeperator = seperator || timeSeperator;
    return date.getHours() + thisSeperator + date.getMinutes();
}