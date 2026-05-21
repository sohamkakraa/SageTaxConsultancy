#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
npm run build
lsof -ti :3006 | xargs kill -9 2>/dev/null || true
exec npm start -- -p 3006
