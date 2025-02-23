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
        date: '1-6',
        name: 'ষষ্ঠী',
        type: 'religious',
        description: 'দুর্গাপূজার ষষ্ঠী'
    },
    {
        date: '26-3',
        name: 'স্বাধীনতা দিবস',
        type: 'national',
        description: 'বাংলাদেশের স্বাধীনতা দিবস'
    },
    {
        date: '14-4',
        name: 'পহেলা বৈশাখ',
        type: 'cultural',
        description: 'বাংলা নববর্ষ'
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