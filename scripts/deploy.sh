#!/usr/bin/env bash
#
# Publish the built site to the gh-pages branch.
#
#   npm run deploy                 → https://jakaria-istauk.github.io/portfolio/
#   BASE_PATH=/ npm run deploy     → for a custom domain served at the root
#
# gh-pages holds build output only. It has no shared history with the source
# branch, so it is rewritten on every deploy — never commit source to it.

set -euo pipefail

BRANCH="gh-pages"
WORKTREE=".deploy"
BASE_PATH="${BASE_PATH:-/portfolio/}"
SOURCE_REF="$(git rev-parse --abbrev-ref HEAD)"
SOURCE_SHA="$(git rev-parse --short HEAD)"

cd "$(dirname "$0")/.."

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree has uncommitted changes. Commit or stash them first, so"
  echo "the deployed build matches a commit you can point at."
  exit 1
fi

echo "Building with base ${BASE_PATH} from ${SOURCE_REF} (${SOURCE_SHA})"
BASE_PATH="$BASE_PATH" npm run build

if [[ ! -f dist/index.html ]]; then
  echo "Build produced no dist/index.html — stopping."
  exit 1
fi

# A worktree keeps the source checkout untouched while the branch is rewritten.
git worktree remove --force "$WORKTREE" 2>/dev/null || true
rm -rf "$WORKTREE"

git fetch origin "$BRANCH" 2>/dev/null || true

if git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
  git worktree add -B "$BRANCH" "$WORKTREE" "origin/$BRANCH"
else
  git worktree add --detach "$WORKTREE"
  git -C "$WORKTREE" switch --orphan "$BRANCH"
fi

# Replace the branch contents wholesale: stale files should not survive.
find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R dist/. "$WORKTREE"/

# Without this, GitHub runs the output through Jekyll and drops _-prefixed paths.
touch "$WORKTREE/.nojekyll"

git -C "$WORKTREE" add --all

if git -C "$WORKTREE" diff --cached --quiet; then
  echo "Nothing changed since the last deploy."
else
  git -C "$WORKTREE" commit -m "deploy: ${SOURCE_REF} ${SOURCE_SHA}"
  git -C "$WORKTREE" push -u origin "$BRANCH"
  echo "Pushed ${BRANCH}."
fi

git worktree remove --force "$WORKTREE"
echo "Done."
