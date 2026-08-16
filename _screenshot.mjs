import { chromium } from "playwright";

const outDir = "C:\\Users\\DELL\\AppData\\Local\\Temp\\claude\\c--Users-DELL-OneDrive-Desktop-mousday\\b17185ae-7fb2-493b-980f-28496711d215\\scratchpad";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 420, height: 860 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:5174/", { waitUntil: "networkidle" });
await page.waitForTimeout(1600);
await page.screenshot({ path: `${outDir}\\11-home-settled.png` });

await page.getByText(/Write today's entry|Continue today's entry/).click();
await page.waitForTimeout(600);

await page.locator("textarea").nth(2).fill("Go to bed 30 minutes earlier and stretch.");
await page.getByText("Save entry").click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}\\12-toast-position.png` });
await page.waitForTimeout(1500);

// go to tomorrow to see carry-forward reminder
await page.locator('button[aria-label="Next day"]').click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}\\13-carry-forward.png` });

console.log("DONE. errors:", errors.length, JSON.stringify(errors));
await browser.close();
