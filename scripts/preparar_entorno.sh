#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node --version
mkdir -p .release
install -m 0644 site/index.html site/tareas.mjs .release/
