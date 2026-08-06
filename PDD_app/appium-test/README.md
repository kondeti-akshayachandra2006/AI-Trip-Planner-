# Appium + Load Test Suite for PDD App

This folder contains:
- an Appium-style test harness for mobile flows
- a simple baseline load test script for the web/app backend
- an Excel report generator for 305 test cases

## Run

```bash
cd PDD_app/appium-test
npm install
npm run appium:dry-run
npm run load:test
npm run report
```

The generated workbook will be written to:
- appium-test/reports/appium-load-test-summary.xlsx
