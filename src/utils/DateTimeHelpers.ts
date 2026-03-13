/**
 * Formats a date to DD-MM-YYYY format
 * @param date - The date to format
 * @returns Formatted date string in DD-MM-YYYY format
 * @example
 * formatDateDDMMYYYY(new Date('2025-01-15')) // Returns "15-01-2025"
 */
export const formatDateDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Returns relative time from now (e.g., "2 days ago", "3 months ago")
 * @param date - The date to compare with current date
 * @returns Relative time string
 * @example
 * getRelativeTime(new Date('2025-01-13')) // Returns "2 days ago"
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return 'just now';
};

/**
 * Formats a date with both absolute and relative time
 * @param date - The date to format
 * @returns Combined format: "DD-MM-YYYY (x days/months ago)"
 * @example
 * formatDateWithRelativeTime(new Date('2025-01-13')) // Returns "13-01-2025 (2 days ago)"
 */
export const formatDateWithRelativeTime = (date: Date): string => {
  const formattedDate = formatDateDDMMYYYY(date);
  const relativeTime = getRelativeTime(date);
  return `${formattedDate} (${relativeTime})`;
};

/**
 * Creates a date-only ISO string (UTC midnight) for comparison purposes
 * @param date - The date to convert
 * @returns ISO string with time set to 00:00:00.000Z
 * @example
 * getDateOnlyISO(new Date('2025-01-15T14:30:00')) // Returns "2025-01-15T00:00:00.000Z"
 */
export const getDateOnlyISO = (date: Date): string => {
  return new Date(
      Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate()
      )
  ).toISOString();
};

/**
 * Calculates the difference in days between two dates
 * @param date1 - The first date
 * @param date2 - The second date (defaults to current date)
 * @returns Number of days between dates
 * @example
 * getDaysDifference(new Date('2025-01-10')) // Returns number of days from Jan 10 to now
 */
export const getDaysDifference = (date1: Date, date2: Date = new Date()): number => {
  const diffMs = date2.getTime() - date1.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

/**
 * Calculates the difference in months between two dates
 * @param date1 - The first date
 * @param date2 - The second date (defaults to current date)
 * @returns Number of months between dates
 * @example
 * getMonthsDifference(new Date('2024-10-15')) // Returns number of months from Oct to now
 */
export const getMonthsDifference = (date1: Date, date2: Date = new Date()): number => {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  return yearDiff * 12 + monthDiff;
};

/**
 * Calculates the difference in years between two dates
 * @param date1 - The first date
 * @param date2 - The second date (defaults to current date)
 * @returns Number of years between dates
 * @example
 * getYearsDifference(new Date('2020-01-15')) // Returns number of years from 2020 to now
 */
export const getYearsDifference = (date1: Date, date2: Date = new Date()): number => {
  return date2.getFullYear() - date1.getFullYear();
};

/**
 * Formats a date to ISO date string (YYYY-MM-DD)
 * @param date - The date to format
 * @returns ISO date string
 * @example
 * formatISODate(new Date('2025-01-15')) // Returns "2025-01-15"
 */
export const formatISODate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Checks if a date is today
 * @param date - The date to check
 * @returns True if date is today, false otherwise
 * @example
 * isToday(new Date()) // Returns true
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return formatISODate(date) === formatISODate(today);
};
