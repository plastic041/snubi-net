import { test, expect } from "@playwright/test";
import { resolve } from "path";

test("works/destiny-card page works", async ({ page }, testInfo) => {
  await page.goto("works/destiny-card");

  await page.waitForTimeout(1000);

  const screenshot = await page.screenshot();

  testInfo.snapshotDir = resolve(__dirname, "destiny-card");
  testInfo.attach("screenshot", {
    body: screenshot,
    contentType: "image/png",
  });

  await expect(page).toHaveScreenshot();
});
