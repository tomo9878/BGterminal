#!/usr/bin/env bash
set -e

PORTAL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GAMES_OUT="$PORTAL_ROOT/public/games"

mkdir -p "$GAMES_OUT"

echo "=== Building hannnibal ==="
cd "$PORTAL_ROOT/games/hannnibal/hannibal-solo"
npm install --legacy-peer-deps
npx vite build --base=/games/hannnibal/ --outDir="$GAMES_OUT/hannnibal"

echo "=== Building manilla ==="
cd "$PORTAL_ROOT/games/manilla/frontend"
npm install --legacy-peer-deps
npx vite build --base=/games/manilla/ --outDir="$GAMES_OUT/manilla"

echo "=== Building pandemic_rome ==="
cd "$PORTAL_ROOT/games/pandemic_rome"
npm install --legacy-peer-deps
npx vite build --base=/games/pandemic_rome/ --outDir="$GAMES_OUT/pandemic_rome"

echo ""
echo "All games built successfully!"
