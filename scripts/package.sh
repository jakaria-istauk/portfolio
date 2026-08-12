#!/usr/bin/env bash
#
# Build for a domain root and zip it for manual upload (jakaria.com.bd).
#
#   npm run package  →  jakaria-portfolio-dist.zip
#
# Use this rather than zipping dist/ by hand: `npm run deploy` leaves dist/
# built for the GitHub project page under /portfolio/, and those paths 404
# when the same files are served from a domain root.

set -euo pipefail

cd "$(dirname "$0")/.."

ZIP="jakaria-portfolio-dist.zip"

echo "Building for the domain root"
BASE_PATH=/ npm run build

if [[ ! -f dist/index.html ]]; then
  echo "Build produced no dist/index.html — stopping."
  exit 1
fi

# Guard against uploading a project-page build to a domain root.
if grep -q 'href="/portfolio/' dist/index.html; then
  echo "dist/ still points at /portfolio/ — refusing to package it."
  exit 1
fi

rm -f "$ZIP"
(cd dist && zip -qr "../$ZIP" . -x '.DS_Store')

echo
echo "$ZIP  ($(du -h "$ZIP" | cut -f1))"
echo "Upload its contents to the web root — the files themselves, not a dist folder."
