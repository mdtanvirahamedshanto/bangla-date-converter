export interface BanglaDate {
    year: number;
    date: number;
    month: string;
    day: string;
    season: string;
    monthIndex: number;
    time?: string;
    hour?: number;
    minute?: number;
    second?: number;
}

export interface DateConverterOptions {
    format?: 'bn' | 'en';
    showSeason?: boolean;
    showWeekDay?: boolean;
    showTime?: boolean;
    timeFormat?: '12h' | '24h';
}

export interface FormattedDateOptions {
    template?: string;
    format?: 'bn' | 'en';
    numerals?: 'bn' | 'en';
    timeFormat?: '12h' | '24h';
    separator?: string;
    ordinal?: boolean;
    relative?: boolean;
    shortMonth?: boolean;
    shortWeekDay?: boolean;
}

export class DateValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DateValidationError';
    }
}