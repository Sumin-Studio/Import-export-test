// Define our supported regions
export const REGIONS = {
  UK: "UK",
  USA: "USA",
  CA: "CA",
  NZ: "NZ",
  AU: "AU",
  DEFAULT: "NZ", // Default region for unsupported locations
} as const;

// Map country codes to our regions
export const COUNTRY_TO_REGION: Record<string, string> = {
  GB: REGIONS.UK,
  US: REGIONS.USA,
  CA: REGIONS.CA,
  NZ: REGIONS.NZ,
  AU: REGIONS.AU,
};

export type Region = (typeof REGIONS)[keyof typeof REGIONS];
