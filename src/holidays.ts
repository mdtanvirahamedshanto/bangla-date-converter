import { BanglaDateConverter } from ".";

export interface BanglaHoliday {
    date: string;
    name: string;
    type: 'religious' | 'national' | 'cultural';
    description?: string;
}

export const banglaHolidays: BanglaHoliday[] = [
    {
        date: '1-1',
        name: 'পহেলা বৈশাখ',
        type: 'cultural',
        description: 'বাংলা নববর্ষ'
    },
    {
        date: '21-2',
        name: 'শহীদ দিবস',
        type: 'national',
        description: 'আন্তর্জাতিক মাতৃভাষা দিবস'
    },
    {
        date: '26-3',
        name: 'স্বাধীনতা দিবস',
        type: 'national',
        description: 'বাংলাদেশের স্বাধীনতা দিবস'
    },
    {
        date: '14-4',
        name: 'বাংলা নববর্ষ',
        type: 'cultural',
        description: 'পহেলা বৈশাখ'
    },
    {
        date: '1-5',
        name: 'মে দিবস',
        type: 'national',
        description: 'আন্তর্জাতিক শ্রমিক দিবস'
    },
    {
        date: '15-8',
        name: 'জাতীয় শোক দিবস',
        type: 'national',
        description: 'বঙ্গবন্ধু শেখ মুজিবুর রহমানের শাহাদাত বার্ষিকী'
    },
    {
        date: '16-12',
        name: 'বিজয় দিবস',
        type: 'national',
        description: 'বাংলাদেশের মহান বিজয় দিবস'
    },
    {
        date: '6-7',
        name: 'ষষ্ঠী',
        type: 'religious',
        description: 'দুর্গাপূজার ষষ্ঠী'
    },
    {
        date: '7-7',
        name: 'সপ্তমী',
        type: 'religious',
        description: 'দুর্গাপূজার সপ্তমী'
    },
    {
        date: '8-7',
        name: 'অষ্টমী',
        type: 'religious',
        description: 'দুর্গাপূজার অষ্টমী'
    }
];

export function getHolidaysByMonth(month: number): BanglaHoliday[] {
    return banglaHolidays.filter(holiday => {
        const [holidayDate] = holiday.date.split('-').map(Number);
        return holidayDate === month;
    });
}

export function getHolidaysByType(type: BanglaHoliday['type']): BanglaHoliday[] {
    return banglaHolidays.filter(holiday => holiday.type === type);
}

export function getUpcomingHolidays(currentDate: Date, count: number = 5): BanglaHoliday[] {
    const converter = new BanglaDateConverter(currentDate);
    const banglaDate = converter.getBanglaDate();
    
    return banglaHolidays
        .filter(holiday => {
            const [holidayDate, holidayMonth] = holiday.date.split('-').map(Number);
            if (holidayMonth < banglaDate.monthIndex) return false;
            if (holidayMonth === banglaDate.monthIndex && holidayDate < banglaDate.date) return false;
            return true;
        })
        .slice(0, count);
}