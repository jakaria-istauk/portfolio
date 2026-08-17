// Facts about the deployed site that more than one build step needs.
//
// The canonical host is jakaria.com.bd without www. Everything else that
// serves these files — the GitHub project page, a local preview — is a
// duplicate of it, which is exactly what the canonical tag and the sitemap
// are there to say.

export const SITE_URL = 'https://jakaria.com.bd'

// Every path the sitemap should list, canonical path first. Keep the leading
// and trailing slashes: they have to match what the server actually serves,
// or the sitemap advertises URLs that redirect.
export const ROUTES = ['/']
