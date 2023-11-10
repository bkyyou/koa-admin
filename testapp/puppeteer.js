const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto('http://localhost:4008/vue');
  // await page.goto('http://localhost:8080/login');
  await page.goto('http://localhost:8081/user');
  // await page.goto('https://example.com');
  // await page.goto('https://baidu.com');
  // await page.goto('http://ygzc.ygyg.fat/account/overdueCenter/list?eid=277&icate=2');
  await page.screenshot({path: 'baidu1.png'});

  await browser.close();
})();