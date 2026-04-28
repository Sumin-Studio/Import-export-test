// Showcase types and utilities

export interface Showcase {
  id: string;
  title: string;
  description: string;
  deployed_url: string | null;
  github_url: string | null;
  base_prototype_slug: string | null;
  author_user_id: string;
  avatar_seed: string;
  created_at: string;
  updated_at: string;
  // Joined fields from API
  author_name?: string | null;
  author_email?: string | null;
  iteration_count?: number;
  latest_version?: string;
}

export interface ShowcaseIteration {
  id: string;
  showcase_id: string;
  version: string;
  summary: string;
  deployed_url?: string | null;
  github_url?: string | null;
  created_at: string;
}

export interface ShowcaseWithIterations extends Showcase {
  iterations: ShowcaseIteration[];
}

export interface CreateShowcaseInput {
  title: string;
  description: string;
  deployed_url?: string | null;
  github_url?: string | null;
  base_prototype_slug?: string | null;
  initial_version_summary?: string;
}

export interface UpdateShowcaseInput {
  title?: string;
  description?: string;
  deployed_url?: string | null;
  github_url?: string | null;
  base_prototype_slug?: string | null;
}

export interface CreateIterationInput {
  version: string;
  summary: string;
  deployed_url?: string | null;
  github_url?: string | null;
}

/**
 * Generate DiceBear preview URL for a showcase
 * Uses the 'glass' style with a consistent seed and randomized appearance
 */
export function getShowcasePreviewUrl(seed: string): string {
  // Generate consistent but varied colors based on seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate color from seed
  const hue1 = Math.abs(hash % 360);
  
  // Convert hue to hex color
  const hueToHex = (h: number) => {
    const s = 65; // saturation
    const l = 55; // lightness
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l / 100 - c / 2;
    let r = 0, g = 0, b = 0;
    
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return toHex(r) + toHex(g) + toHex(b);
  };
  
  const bgColor = hueToHex(hue1);
  const rotate = Math.abs(hash % 360);
  const translateX = Math.abs((hash >> 4) % 40) - 20;
  const translateY = Math.abs((hash >> 6) % 40) - 20;
  
  return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bgColor}&rotate=${rotate}&translateX=${translateX}&translateY=${translateY}`;
}

/**
 * Check if a user can edit a showcase
 * Users can edit their own showcases
 * Note: Admin check would need to be implemented with Clerk organization roles
 */
export function canEditShowcase(showcase: Showcase, userId: string | null): boolean {
  if (!userId) return false;
  return showcase.author_user_id === userId;
}

/**
 * Format a showcase URL for display
 * Removes protocol and trailing slashes
 */
export function formatShowcaseUrl(url: string | null): string {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * Get the primary URL for a showcase (deployed > github)
 */
export function getPrimaryUrl(showcase: Showcase): string | null {
  return showcase.deployed_url || showcase.github_url;
}

/**
 * Check if a showcase has both deployed and GitHub URLs
 */
export function hasBothUrls(showcase: Showcase): boolean {
  return !!(showcase.deployed_url && showcase.github_url);
}

/**
 * Validate that at least one URL is provided
 */
export function validateShowcaseUrls(deployed_url: string | null | undefined, github_url: string | null | undefined): boolean {
  return !!(deployed_url || github_url);
}

/**
 * Sort showcases by creation date (newest first)
 */
export function sortShowcasesByDate(showcases: Showcase[]): Showcase[] {
  return [...showcases].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Sort iterations by creation date (newest first)
 */
export function sortIterationsByDate(iterations: ShowcaseIteration[]): ShowcaseIteration[] {
  return [...iterations].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

