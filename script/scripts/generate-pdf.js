const { execFile } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT_DIR = path.join(__dirname, "..");
const INPUT_HTML = path.join(ROOT_DIR, "print.html");
const OUTPUT_PDF = path.join(ROOT_DIR, "GoLang.pdf");

async function generatePDF() {
  console.log(`Generating PDF from ${INPUT_HTML}...`);

  const args = [
    "--headless",
    "--disable-gpu",
    `--print-to-pdf=${OUTPUT_PDF}`,
    "--no-margins",
    "--no-pdf-header-footer",
    INPUT_HTML,
  ];

  return new Promise((resolve, reject) => {
    execFile(CHROME_PATH, args, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

generatePDF()
  .then(() => {
    console.log(`Successfully generated ${OUTPUT_PDF}`);
  })
  .catch((err) => {
    console.error("Error generating PDF:", err);
    process.exit(1);
  });
