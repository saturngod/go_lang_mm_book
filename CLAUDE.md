# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Go programming language book written in Myanmar (Burmese)**. It consists of 23 chapters (`chapter_01.md` through `chapter_23.md`) covering Go fundamentals through advanced topics like concurrency, REST APIs, data structures, and the Echo framework.

All chapter content is written in Myanmar script with embedded Go code examples.

## Build Commands

Generate combined markdown, PDF, and EPUB outputs:

```bash
cd script && sh generate.sh
```

This script:
1. Concatenates all `chapter_*.md` files (sorted numerically) into `script/all.md`
2. Runs `node scripts/build-print.js` and `node scripts/generate-pdf.js` for PDF generation
3. Uses `pandoc` with `mermaid-filter` to generate `GoLang.epub`

**Dependencies**: Node.js, Pandoc, mermaid-filter

## Repository Structure

- `chapter_XX.md` — Individual book chapters (root directory)
- `script/` — Build tooling
  - `generate.sh` — Main build script
  - `scripts/build-print.js` — Print-ready HTML builder
  - `scripts/generate-pdf.js` — PDF generator
  - `scripts/print-template.html` — HTML template for print output
- `README.md` — Table of contents in Myanmar

## Content Conventions

- Chapter files follow strict naming: `chapter_XX.md` with zero-padded two-digit numbers
- Chapters are written in Myanmar with Go code blocks using standard markdown fenced code blocks
- The build script relies on alphabetical/numerical sorting of `chapter_*.md` filenames
