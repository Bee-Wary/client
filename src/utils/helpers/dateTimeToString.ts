const dateSeperator = '/';
const timeSeperator = ':';


export function MakeMinimumTwoDigit(number: number): string {
    if (number >= 10) {
        return String(number);
    }
    return "0" + number;
}
/**
 * Convert a date object to a full string notation.
 * @param date - the date object.
 * @param seperator - optional preferred seperator, defaut is / .
 * @returns - a string notation of the date DDMMYY with seperators.
 */
export const DateToStringDateDDMMYY = (date: Date, seperator?: string): string => {
    const thisSeperator = seperator || dateSeperator;
    return MakeMinimumTwoDigit(date.getDate()) + thisSeperator + MakeMinimumTwoDigit(date.getMonth()) + thisSeperator + date.getFullYear();
}

/**
 * Convert a date object to a full string notation.
 * @param date - the date object.
 * @param seperator - optional preferred seperator, defaut is / .
 * @returns - a string notation of the date YYMMDD with seperators.
 */
export const DateToStringDateYYMMDD = (date: Date , seperator?: string): string => {
    const thisSeperator = seperator || dateSeperator;
    return date.getFullYear() + thisSeperator + MakeMinimumTwoDigit(date.getMonth()) + thisSeperator + MakeMinimumTwoDigit(date.getDate());
}

/**
 * Convert a date object to a full string notation.
 * @param date - the date object.
 * @param seperator - optional preferred seperator, defaut is / .
 * @returns - a string notation of the date YYDDMM with seperators.
 */
export const DateToStringDateYYDDMM = (date: Date, seperator?: string): string => {
    const thisSeperator = seperator || dateSeperator;
    return date.getFullYear() + thisSeperator + MakeMinimumTwoDigit(date.getDate()) + thisSeperator + MakeMinimumTwoDigit(date.getMonth());
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