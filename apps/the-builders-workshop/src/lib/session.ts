/**
 * Session tracking utilities for tracking last login time
 * Uses localStorage to persist last login timestamp across sessions
 */

/** Intentionally unchanged from before the Builders Workshop rename so existing browsers keep the same last-login timestamp. */
const LAST_LOGIN_KEY = "builders_initiative_last_login";

/**
 * Gets the last login timestamp from localStorage
 * @returns ISO string timestamp or null if not set
 */
export function getLastLoginTime(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  
  const stored = localStorage.getItem(LAST_LOGIN_KEY);
  return stored || null;
}

/**
 * Updates the last login timestamp to the current time
 * @returns The timestamp that was saved
 */
export function updateLastLoginTime(): string {
  const now = new Date().toISOString();
  
  if (typeof window !== "undefined") {
    localStorage.setItem(LAST_LOGIN_KEY, now);
  }
  
  return now;
}

/**
 * Filters completions to only include those after the last login time
 * @param completions Array of completion objects with completed_at field
 * @param lastLoginTime ISO string timestamp to filter by
 * @returns Filtered array of completions
 */
export function getChangesSinceLastLogin<T extends { completed_at?: string | null }>(
  completions: T[],
  lastLoginTime: string | null
): T[] {
  if (!lastLoginTime) {
    return completions;
  }
  
  const lastLoginDate = new Date(lastLoginTime);
  
  return completions.filter((completion) => {
    if (!completion.completed_at) {
      return false;
    }
    
    const completedDate = new Date(completion.completed_at);
    return completedDate > lastLoginDate;
  });
}



