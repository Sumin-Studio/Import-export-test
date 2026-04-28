import { useMemo } from "react";

interface FormattedDate {
  displayText: string;
  isOverdue: boolean;
  daysFromToday: number;
}

/**
 * Hook to format dates based on days from today
 * @param daysFromToday - Number of days relative to today (negative = past, positive = future)
 * @param showYear - Whether to include the year in the formatted date (default: false)
 * @param locale - Optional locale code for date formatting (default: "en-US")
 * @returns Object containing formatted display text and metadata
 */
export function useFormatRelativeDate(
  daysFromToday: number,
  showYear: boolean = false,
  locale: string = "en-US"
): FormattedDate {
  return useMemo(() => {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + daysFromToday);

    const isOverdue = daysFromToday < 0;

    // Format the date string as "18 May 2025" or "18 May" style
    const day = dueDate.getDate();
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });
    const monthStr = monthFormatter.format(dueDate);
    const year = dueDate.getFullYear();

    const displayText = showYear
      ? `${day} ${monthStr} ${year}`
      : `${day} ${monthStr}`;

    return {
      displayText,
      isOverdue,
      daysFromToday,
    };
  }, [daysFromToday, showYear, locale]);
}
