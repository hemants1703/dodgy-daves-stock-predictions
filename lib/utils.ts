import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getDateNDaysAgo(n: number): string {
  const now = new Date(); // current date and time
  now.setDate(now.getDate() - n); // subtract n days
  return formatDate(now);
}

export const dates = {
  startDate: getDateNDaysAgo(3), // alter days to increase/decrease data set
  endDate: getDateNDaysAgo(1) // leave at 1 to get yesterday's data
}