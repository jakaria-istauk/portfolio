#!/usr/bin/env bash
#
# Publish the built site to the ftp-deploy branch, which the
# .github/workflows/ftp-deploy.yml action uploads to the FTP host.
#
#   npm run deploy:ftp                       → build for the domain root, push
#   BASE_PATH=/sub/ npm run deploy:ftp       → build for a subdirectory
#
# The build happens here, locally. The action only transfers files, so the
# branch must contain the exact tree the web root should end up with: the
# contents of dist/ at the top level, nothing more.
#
# ftp-deploy holds build output only. It has no shared history with the source
# branch and is rewritten on every publish — never commit source to it.

set -euo pipefail

BRANCH="ftp-deploy"
WORKTREE=".ftp-deploy"
BASE_PATH="${BASE_PATH:-/}"
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

# Guard against shipping a GitHub project-page build to the FTP host root.
if [[ "$BASE_PATH" == "/" ]] && grep -q 'href="/portfolio/' dist/index.html; then
  echo "dist/ still points at /portfolio/ — refusing to publish it."
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

# The workflow file has to exist on the branch that triggers it.
mkdir -p "$WORKTREE/.github/workflows"
cp .github/workflows/ftp-deploy.yml "$WORKTREE/.github/workflows"/

git -C "$WORKTREE" add --all --force

if git -C "$WORKTREE" diff --cached --quiet; then
  echo "Nothing changed since the last publish."
else
  git -C "$WORKTREE" commit -m "ftp: ${SOURCE_REF} ${SOURCE_SHA}"
  git -C "$WORKTREE" push -u origin "$BRANCH"
  echo "Pushed ${BRANCH}. The FTP workflow takes it from here."
fi

git worktree remove --force "$WORKTREE"
echo "Done."
