#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
test -n "${GITHUB_SHA:?Falta el identificador de la versión}"
mkdir -p dist
install -m 0644 .release/index.html .release/tareas.mjs dist/
printf '%s\n' "$GITHUB_SHA" > dist/version.txt
