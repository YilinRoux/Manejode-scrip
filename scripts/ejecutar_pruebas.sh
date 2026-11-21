#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
test -s .release/index.html
grep -Fq 'src="./tareas.mjs"' .release/index.html
node --test tests/*.test.mjs
