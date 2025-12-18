#!/usr/bin/env bash
set -euo pipefail

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

out="$SCRIPT_DIR/all.md"

shopt -s nullglob
chapters=("$ROOT_DIR"/chapter_*.md)
shopt -u nullglob

if ((${#chapters[@]} == 0)); then
  echo "No chapter_*.md files found in $ROOT_DIR" >&2
  exit 1
fi

tmp="$(mktemp "${out}.XXXXXX")"
trap 'rm -f "$tmp"' EXIT

# Sort chapters numerically
printf '%s\n' "${chapters[@]}" | sort -V | while IFS= read -r file; do
  [[ -n "$file" ]] || continue
  cat "$file" >>"$tmp"
  printf '\n\n' >>"$tmp"
done

mv "$tmp" "$out"
trap - EXIT
echo "Wrote $out"

node "scripts/build-print.js"
node "scripts/generate-pdf.js"
pandoc all.md --metadata title="GoLang" --metadata author="Gemini 3.0" -F mermaid-filter -o GoLang.epub