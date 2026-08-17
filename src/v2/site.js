// The canonical origin, in a file with no Vite-specific syntax in it so the
// build scripts under scripts/ can import it directly. Everything that needs
// an absolute URL — structured data, Open Graph tags, the sitemap — reads it
// from here, so there is one place to change if the domain ever does.
export const SITE_URL = 'https://jakaria.com.bd'

export const OG_IMAGE = `${SITE_URL}/og.png`
