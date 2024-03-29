const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

app.get("/image", async (req, res) => {
  // This was puppeteer.launch()
  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://browserless:3000",
  });
  const page = await browser.newPage();

  await page.setViewport({width: 1920, height: 1080});

  await page.goto("http://www.example.com/");
  const data = await page.screenshot();
  browser.close();

  console.log("Screenshot taken");

  return res.end(data, "binary");
});

app.get("/", async (req, res) => {
  console.log("Screenshot taken");
  
  res.send('Hello World!')
});

app.listen(8080);
