// Define our supported regions
export const REGIONS = {
  UK: "UK",
  USA: "USA",
  NZ: "NZ",
  AU: "AU",
  REST_OF_WORLD: "REST_OF_WORLD",
  /** NZ tax prototype: default region so NZ-only dashboard tiles + widget picker stay available */
  DEFAULT: "NZ",
} as const;

// Map country codes to our regions
export const COUNTRY_TO_REGION: Record<string, string> = {
  GB: REGIONS.UK,
  US: REGIONS.USA,
  NZ: REGIONS.NZ,
  AU: REGIONS.AU,
};

export type Region = (typeof REGIONS)[keyof typeof REGIONS];
