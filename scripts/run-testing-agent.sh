#!/usr/bin/env bash
# Load OPENAI_API_KEY (and other vars) from project root env files via export.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEMO="$ROOT/.testing-agent-demo"

set -a
if [[ -f "$ROOT/.env" ]]; then
  # shellcheck source=/dev/null
  source "$ROOT/.env"
fi
if [[ -f "$ROOT/.env.local" ]]; then
  # shellcheck source=/dev/null
  source "$ROOT/.env.local"
fi
set +a

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is not set. Add it to $ROOT/.env or $ROOT/.env.local"
  exit 1
fi

export OPENAI_API_KEY

cd "$DEMO"
# Port 3000 is often taken; frontend runs on 3010
exec npx concurrently \
  "PORT=3010 npm run dev:frontend" \
  "npm run dev:cua-server"
