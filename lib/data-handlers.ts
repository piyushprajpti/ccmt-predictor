/**
 * Safe data fetching and validation utilities
 * Handles network errors, validation, and provides proper error feedback
 */

export interface FetchOptions {
  timeout?: number;
  retries?: number;
}

export interface FetchResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

/**
 * Safely fetch and validate JSON data
 * For static frontend data, this is lenient and fast
 */
export async function fetchJsonData(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResult<any>> {
  const { timeout = 5000, retries = 1 } = options;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText || 'Failed to fetch data'}`
        );
      }

      const data = await response.json();

      // For static data, just check if it's not null/undefined
      if (!data) {
        throw new Error('Empty response data');
      }

      return { data, error: null, isLoading: false };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // For static frontend data, don't retry extensively
      if (attempt < retries && lastError.message.includes('timeout')) {
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
      break;
    }
  }

  const errorMessage =
    lastError?.message.includes('abort')
      ? 'Request timeout. Please check your connection and try again.'
      : lastError?.message.includes('404')
      ? 'Data file not found. Please refresh the page.'
      : lastError?.message.includes('Empty')
      ? 'Received empty data from server.'
      : lastError?.message || 'Failed to load data. Please refresh and try again.';

  return { data: null, error: errorMessage, isLoading: false };
}

/**
 * Validate CCMT data structure - Light validation for static JSON data
 */
export function validateCCMTData(data: any): data is Array<any> {
  // For static frontend data, just ensure it's an array with items
  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  // Check if first item has basic required structure
  const firstItem = data[0];
  const requiredFields = ['institute', 'program', 'category', 'openingRank', 'closingRank'];
  
  return requiredFields.every(field => field in firstItem);
}

/**
 * Validate NIRF data structure - Light validation
 */
export function validateNIRFData(data: any): data is {
  institutes: Record<string, any>;
} {
  return (
    typeof data === 'object' &&
    data !== null &&
    'institutes' in data
  );
}

/**
 * Safe score validation
 */
export function validateScore(score: any): boolean {
  const num = parseFloat(score);
  return !isNaN(num) && num >= 0 && num <= 1000;
}

/**
 * Sanitize search input to prevent XSS
 */
export function sanitizeSearchInput(input: string): string {
  return input
    .replace(/[<>\"']/g, '') // Remove HTML special chars
    .slice(0, 100) // Limit length
    .trim();
}
