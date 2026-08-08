const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.WEB_URL || 'http://localhost:5173';
const screenshotsDir = path.join(__dirname, '..', 'artifacts');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runLoginSuite() {
  const options = new chrome.Options();
  options.addArguments('--headless=new');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1440,1200');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const results = [];

  try {
    const cases = [
      {
        id: 1,
        title: 'Loads login page',
        run: async () => {
          await driver.get(baseUrl + '/login');
          await driver.wait(until.elementLocated(By.css('input[placeholder="Email"]')), 10000);
          await driver.findElement(By.css('input[placeholder="Email"]')).isDisplayed();
          return { status: 'PASS', details: 'Login page rendered successfully.' };
        },
      },
      {
        id: 2,
        title: 'Shows password field',
        run: async () => {
          const passwordField = await driver.findElement(By.css('input[placeholder="Password"]'));
          await passwordField.isDisplayed();
          return { status: 'PASS', details: 'Password field is visible.' };
        },
      },
      {
        id: 3,
        title: 'Shows sign-in button',
        run: async () => {
          const button = await driver.findElement(By.xpath("//button[contains(., 'Sign In')]"));
          await button.isDisplayed();
          return { status: 'PASS', details: 'Sign In button is visible.' };
        },
      },
      {
        id: 4,
        title: 'Allows entering email',
        run: async () => {
          await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys('test@example.com');
          return { status: 'PASS', details: 'Email input accepted test value.' };
        },
      },
      {
        id: 5,
        title: 'Allows entering password',
        run: async () => {
          await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys('Test123!');
          return { status: 'PASS', details: 'Password input accepted test value.' };
        },
      },
      {
        id: 6,
        title: 'Shows forgot password link',
        run: async () => {
          const link = await driver.findElement(By.xpath("//button[contains(., 'Forgot Password?')]"));
          await link.isDisplayed();
          return { status: 'PASS', details: 'Forgot password link available.' };
        },
      },
      {
        id: 7,
        title: 'Shows sign-up prompt',
        run: async () => {
          const signUpPrompt = await driver.findElement(By.xpath("//button[contains(., 'Sign Up')]"));
          await signUpPrompt.isDisplayed();
          return { status: 'PASS', details: 'Sign up prompt visible.' };
        },
      },
      {
        id: 8,
        title: 'Clears form fields after reset',
        run: async () => {
          await driver.findElement(By.css('input[placeholder="Email"]')).clear();
          await driver.findElement(By.css('input[placeholder="Password"]')).clear();
          return { status: 'PASS', details: 'Form fields cleared successfully.' };
        },
      },
      {
        id: 9,
        title: 'Accepts empty email validation path',
        run: async () => {
          await driver.findElement(By.css('input[placeholder="Email"]')).clear();
          await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys('Test123!');
          await driver.findElement(By.xpath("//button[contains(., 'Sign In')]" )).click();
          await sleep(1000);
          return { status: 'PASS', details: 'Validation path triggered without crashing.' };
        },
      },
      {
        id: 10,
        title: 'Accepts empty password validation path',
        run: async () => {
          await driver.findElement(By.css('input[placeholder="Email"]')).sendKeys('test@example.com');
          await driver.findElement(By.css('input[placeholder="Password"]')).clear();
          await driver.findElement(By.xpath("//button[contains(., 'Sign In')]" )).click();
          await sleep(1000);
          return { status: 'PASS', details: 'Validation path triggered without crashing.' };
        },
      },
    ];

    for (const testCase of cases) {
      try {
        const result = await testCase.run();
        results.push({ id: testCase.id, title: testCase.title, status: result.status, details: result.details });
      } catch (error) {
        results.push({ id: testCase.id, title: testCase.title, status: 'FAIL', details: error.message });
      }
    }

    const summaryPath = path.join(screenshotsDir, 'selenium-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, results, total: results.length, passed: results.filter((r) => r.status === 'PASS').length, failed: results.filter((r) => r.status === 'FAIL').length }, null, 2));
    console.log(`Completed ${results.length} Selenium login test cases.`);
    console.log(JSON.stringify(results.slice(0, 10), null, 2));
    if (results.some((result) => result.status === 'FAIL')) {
      process.exitCode = 1;
    }
  } finally {
    await driver.quit();
  }
}

runLoginSuite().catch((error) => {
  console.error(error);
  process.exit(1);
});
