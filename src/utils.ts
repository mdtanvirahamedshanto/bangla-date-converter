import { Constants } from "./constants";

export function isLeapYear(year: number): boolean {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function toBanglaNumeral(number: number | string): string {
    return number.toString().replace(/\d/g, match => Constants.banglaNumbers[match] || match);
}

export function toEnglishNumeral(number: string): string {
    const bengaliNumbers = Object.entries(Constants.banglaNumbers).reduce(
        (acc, [en, bn]) => ({ ...acc, [bn]: en }), {}
    );
    return number.replace(/[০-৯]/g, match => bengaliNumbers[match] || match);
}