const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const appiumResultsPath = path.join(__dirname, '..', 'results', 'appium-results.json');
const loadResultsPath = path.join(__dirname, '..', 'results', 'load-results.json');
const outputDir = path.join(__dirname, '..', 'reports');
const outputFile = path.join(outputDir, 'appium-load-test-summary.xlsx');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function buildWorkbook() {
  const appiumSummary = JSON.parse(fs.readFileSync(appiumResultsPath, 'utf8'));
  const loadSummary = JSON.parse(fs.readFileSync(loadResultsPath, 'utf8'));
  const cases = [...appiumSummary.cases, ...loadSummary.cases];

  const rows = [['Test Case ID', 'Category', 'Title', 'Status', 'Details']];
  cases.forEach((testCase, index) => {
    rows.push([index + 1, testCase.category, testCase.title, testCase.status, testCase.details]);
  });

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Appium & Load Test Summary');
  ensureDir(outputDir);
  XLSX.writeFile(workbook, outputFile);

  console.log(`Workbook written to ${outputFile}`);
  console.log(`Total cases exported: ${cases.length}`);
}

buildWorkbook();
