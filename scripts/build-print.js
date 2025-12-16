const fs = require("node:fs/promises");
const path = require("node:path");
const marked = require("marked");

async function main() {
  const root = process.cwd();
  const mdPath = path.join(root, "all.md");
  const templatePath = path.join(root, "scripts", "print-template.html");
  const outPath = path.join(root, "print.html");

  const [markdown, template] = await Promise.all([
    fs.readFile(mdPath, "utf8"),
    fs.readFile(templatePath, "utf8"),
  ]);

  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    smartLists: true,
    headerIds: true,
    mangle: false,
  });

  const contentHtml = marked(markdown);
  const html = template.replace("<!--MARKDOWN_CONTENT-->", contentHtml);

  await fs.writeFile(outPath, html, "utf8");
  process.stdout.write(`Wrote ${path.relative(root, outPath)}\n`);
}

main().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n");
  process.exitCode = 1;
});

