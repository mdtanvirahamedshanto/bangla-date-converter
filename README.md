# Bangla Date Converter

[![npm version](https://img.shields.io/npm/v/bangla-date-converter.svg)](https://www.npmjs.com/package/bangla-date-converter)
![npm](https://img.shields.io/npm/v/bangla-date-converter)
![typescript](https://img.shields.io/badge/TypeScript-Ready-blue)

A powerful and flexible TypeScript/JavaScript library for converting Gregorian dates to Bangla dates with extensive formatting options. Works seamlessly with both CommonJS and ES Modules!

## Features

- 🔄 Convert any Gregorian date to Bangla date
- 🌐 Support for both Bengali and English output
- 🎨 Custom date formatting
- 🔢 Bengali numeral conversion
- 🌺 Season information
- 📅 Weekday support
- ⌚ Time formatting (12/24 hour)
- 📝 Relative time formatting
- 💪 TypeScript support

## Quick Start 🚀

### Installation

```bash
npm install bangla-date-converter
```

### Import the Package

```typescript
// Using ES Modules
import { BanglaDateConverter } from 'bangla-date-converter';

// Using CommonJS
const { BanglaDateConverter } = require('bangla-date-converter');
```

### Basic Usage 📅

```typescript
// Create a converter instance
const converter = new BanglaDateConverter(new Date());

// Get Bangla date (returns full date object)
const banglaDate = converter.getBanglaDate();
console.log(banglaDate);
// Output: { year: 1430, date: 15, month: 'পৌষ', day: 'শনিবার', season: 'শীত', monthIndex: 8 }

// Format date with custom template
const formatted = converter.format({
  template: 'DD MM, YY (WW)',
  format: 'bn'
});
console.log(formatted);
// Output: ১৫ পৌষ, ১৪৩০ (শনিবার)
```

### Advanced Formatting Examples 🎨

```typescript
// Custom formatting with time (12-hour format)
const withTime = converter.format({
  template: 'DD MM, YY TT',
  format: 'en',
  timeFormat: '12h',
  shortMonth: true
});
// Output: "15 Poush, 1430 02:30 PM"

// Relative time formatting
const relative = converter.format({
  relative: true,
  format: 'bn'
});
// Output: "আজ" (today) / "গতকাল" (yesterday) / "আগামীকাল" (tomorrow)

// With ordinal numbers
const withOrdinal = converter.format({
  template: 'DD MM',
  ordinal: true
});
// Output: "১৫ই পৌষ"
```

### Converting Bangla to Gregorian Date 🔄

```typescript
// Convert Bangla date to Gregorian
// Parameters: (year, month, date)
// Note: month is 0-based (0-11), where 0 = Boishakh, 11 = Choitro
const gregorianDate = BanglaDateConverter.fromBanglaDate(1430, 0, 1);
console.log(gregorianDate);
// Output: 2023-04-14T00:00:00.000Z (1st Boishakh 1430)
```

## API Documentation

### Core Methods

#### `getBanglaDate(options?: DateConverterOptions): BanglaDate`
Converts a Gregorian date to Bangla date with various formatting options.

```typescript
interface DateConverterOptions {
  format?: 'bn' | 'en';  // Output language
  showSeason?: boolean;   // Include season information
  showWeekDay?: boolean;  // Include week day
  showTime?: boolean;     // Include time
  timeFormat?: '12h' | '24h'; // Time format
}
```

#### `format(options?: FormattedDateOptions): string`
Formats the Bangla date according to specified options.

```typescript
interface FormattedDateOptions {
  template?: string;      // e.g., 'DD MM, YY (WW)'
  format?: 'bn' | 'en';   // Output language
  numerals?: 'bn' | 'en'; // Numeral system
  timeFormat?: '12h' | '24h';
  separator?: string;     // Default: ', '
  ordinal?: boolean;      // Use ordinal numbers
  relative?: boolean;     // Use relative time
  shortMonth?: boolean;   // Short month names
  shortWeekDay?: boolean; // Short weekday names
}
```

### Holiday Features 🎉

#### Get Holidays for Current Month
```typescript
const converter = new BanglaDateConverter(new Date());
const holidays = converter.getHolidays();
// Returns holidays for the current Bangla month
```

#### Get Upcoming Holidays
```typescript
// Get next 5 upcoming holidays
const upcomingHolidays = converter.getUpcomingHolidays(5);
```

#### Get Holidays by Type
```typescript
// Get all religious holidays
const religiousHolidays = converter.getHolidaysByType('religious');
// Types: 'religious' | 'national' | 'cultural'
```

### Date Manipulation

#### Add/Subtract Duration
```typescript
// Add 1 year, 2 months, and 3 days
const futureDate = converter.add(1, 2, 3);

// Subtract 1 year
const pastDate = converter.subtract(1);
```

#### Compare Dates
```typescript
const date1 = new BanglaDateConverter(new Date('2023-04-14'));
const date2 = new BanglaDateConverter(new Date('2023-04-15'));
const comparison = date1.compare(date2); // Returns negative number
```

## Contributing 🤝

Contributions are welcome! Please check our [CONTRIBUTE.md](./CONTRIBUTE.md) for guidelines.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support 💖

If you find this package helpful, please consider giving it a star on GitHub! For issues and feature requests, please use the GitHub issue tracker.

---

Made with ❤️ by [Md Tanvir Ahamed Shanto](https://mdtanvirahamedshanto.vercel.app/) for the Bangla community