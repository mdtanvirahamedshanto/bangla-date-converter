import { BanglaDate, DateConverterOptions, FormattedDateOptions, DateValidationError } from './types';
import { Constants } from './constants';
import { isLeapYear, toBanglaNumeral, toEnglishNumeral } from './utils';

export class BanglaDateConverter {
    private date: Date;

    public static fromBanglaDate(year: number, month: number, date: number): Date {
        if (month < 0 || month > 11) {
            throw new DateValidationError('Invalid month index');
        }

        const monthDays = [...Constants.defaultMonthDays];
        const gregYear = year + 593;
        
        if (isLeapYear(gregYear)) {
            monthDays[10] = 31;
        }

        if (date < 1 || date > monthDays[month]) {
            throw new DateValidationError('Invalid date');
        }

        const epoch = new Date(gregYear, 3, 13);
        let totalDays = 0;

        for (let i = 0; i < month; i++) {
            totalDays += monthDays[i];
        }
        totalDays += date - 1;

        return new Date(epoch.getTime() + totalDays * 24 * 60 * 60 * 1000);
    }

    public compare(other: BanglaDateConverter): number {
        return this.date.getTime() - other.date.getTime();
    }

    public add(years: number = 0, months: number = 0, days: number = 0): BanglaDateConverter {
        const newDate = new Date(this.date);
        newDate.setFullYear(newDate.getFullYear() + years);
        newDate.setMonth(newDate.getMonth() + months);
        newDate.setDate(newDate.getDate() + days);
        return new BanglaDateConverter(newDate);
    }

    public subtract(years: number = 0, months: number = 0, days: number = 0): BanglaDateConverter {
        return this.add(-years, -months, -days);
    }

    constructor(date: Date = new Date()) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new DateValidationError('Invalid date provided');
        }
        this.date = new Date(date);
    }

    public getBanglaDate(options: DateConverterOptions = {}): BanglaDate {
        const {
            format = 'bn',
            showSeason = true,
            showWeekDay = true,
            showTime = false,
            timeFormat = '24h'
        } = options;

        const result = this.calculateBanglaDate();
        
        if (showTime) {
            const hour = this.date.getHours();
            const minute = this.date.getMinutes();
            const second = this.date.getSeconds();
            
            result.hour = hour;
            result.minute = minute;
            result.second = second;
            
            if (timeFormat === '12h') {
                const period = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                result.time = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
            } else {
                result.time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            }
        }
        
        if (format === 'en') {
            return {
                ...result,
                month: Constants.banglaMonthsEnglish[result.monthIndex],
                day: Constants.weekDaysEnglish[this.date.getDay()],
                season: Constants.banglaSeasonsEnglish[Math.floor(result.monthIndex / 2)]
            };
        }

        return result;
    }

    public format(options: FormattedDateOptions = {}): string {
        const {
            template = 'DD MM, YY',
            format = 'bn',
            numerals = 'bn',
            timeFormat = '24h',
            separator = ', ',
            ordinal = false,
            relative = false,
            shortMonth = false,
            shortWeekDay = false
        } = options;

        const date = this.getBanglaDate({ format, showTime: template.includes('TT') || template.includes('hh'), timeFormat });
        let result = template;

        // Handle relative time formatting
        if (relative) {
            const now = new Date();
            const diff = Math.floor((now.getTime() - this.date.getTime()) / 1000);
            const days = Math.floor(diff / 86400);
            
            if (Math.abs(days) < 30) {
                if (days === 0) return format === 'bn' ? 'আজ' : 'Today';
                if (days === 1) return format === 'bn' ? 'গতকাল' : 'Yesterday';
                if (days === -1) return format === 'bn' ? 'আগামীকাল' : 'Tomorrow';
                
                const daysStr = Math.abs(days).toString();
                if (format === 'bn') {
                    return `${toBanglaNumeral(daysStr)} দিন ${days > 0 ? 'আগে' : 'পরে'}`;
                }
                return `${daysStr} days ${days > 0 ? 'ago' : 'later'}`;
            }
        }

        // Handle ordinal numbers
        const dateStr = ordinal ? 
            (format === 'bn' ? `${date.date}${this.getBanglaOrdinalSuffix(date.date)}` : 
                             `${date.date}${this.getEnglishOrdinalSuffix(date.date)}`) :
            date.date.toString();

        // Handle month formatting
        const monthStr = shortMonth ? date.month.substring(0, 3) : date.month;
        const weekDayStr = shortWeekDay ? date.day.substring(0, 3) : date.day;

        result = result
            .replace('DD', dateStr)
            .replace('MM', monthStr)
            .replace('YY', date.year.toString())
            .replace('WW', weekDayStr)
            .replace('SS', date.season)
            .replace('TT', date.time || '')
            .replace('hh', date.hour ? date.hour.toString() : '')
            .replace('mm', date.minute ? date.minute.toString().padStart(2, '0') : '')
            .replace('ss', date.second ? date.second.toString().padStart(2, '0') : '');

        // Apply custom separator
        result = result.replace(/,\s*/g, separator);

        if (numerals === 'bn') {
            result = toBanglaNumeral(result);
        }

        return result;
    }

    private getBanglaOrdinalSuffix(number: number): string {
        return 'তম';
    }

    private getEnglishOrdinalSuffix(number: number): string {
        const j = number % 10;
        const k = number % 100;
        if (j === 1 && k !== 11) return 'st';
        if (j === 2 && k !== 12) return 'nd';
        if (j === 3 && k !== 13) return 'rd';
        return 'th';
    }

    private calculateBanglaDate(): BanglaDate {
        const monthDays = [...Constants.defaultMonthDays];
        
        const gregDate = this.date.getDate();
        const gregMonth = this.date.getMonth();
        const gregYear = this.date.getFullYear();
        const gregDay = this.date.getDay();

        if (isLeapYear(gregYear)) {
            monthDays[10] = 31;
        }

        let adjustedGregYear = gregYear;
        if (gregMonth < 3 || (gregMonth === 3 && gregDate < 14)) {
            adjustedGregYear = gregYear - 1;
        }

        const epoch = new Date(adjustedGregYear, 3, 13);
        const banglaYear = adjustedGregYear - 593;

        const dayDiff = Math.floor(
            (this.date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24)
        );

        let remainingDays = dayDiff;
        let monthIndex = 0;

        for (let i = 0; i < Constants.banglaMonths.length; i++) {
            if (remainingDays <= monthDays[i]) {
                monthIndex = i;
                break;
            }
            remainingDays -= monthDays[i];
        }

        if (remainingDays === 0) remainingDays = 1;

        return {
            year: banglaYear,
            date: remainingDays,
            month: Constants.banglaMonths[monthIndex],
            day: Constants.weekDays[gregDay],
            season: Constants.banglaSeasons[Math.floor(monthIndex / 2)],
            monthIndex
        };
    }
}

export { BanglaDate, DateConverterOptions, FormattedDateOptions, DateValidationError };