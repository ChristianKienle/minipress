// Normalized Build Configuration
export interface _BuildConfig {
  outDir: string;
  // base url
  // If your site is not hosted at the very root but - for example
  // on https://example.org/my-site, then you have to set 'base'
  // to '/my-site/
  base: string;
}

// Build Configuration which is not yet normalized
export type BuildConfig = Partial<_BuildConfig>
