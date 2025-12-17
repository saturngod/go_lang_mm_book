#!/usr/bin/env bash
set -euo pipefail

out="all.md"

shopt -s nullglob
chapters=(chapter_*.md)
shopt -u nullglob

if ((${#chapters[@]} == 0)); then
  echo "No chapter_*.md files found." >&2
  exit 1
fi

tmp="$(mktemp "${out}.XXXXXX")"
trap 'rm -f "$tmp"' EXIT

LC_ALL=C sort -V <<<"${chapters[*]}" | tr ' ' '\n' | while IFS= read -r file; do
  [[ -n "$file" ]] || continue
  cat "$file" >>"$tmp"
  printf '\n\n' >>"$tmp"
done

mv "$tmp" "$out"
trap - EXIT
echo "Wrote $out"

