import { test, expect } from "@playwright/test";

test("works/destiny-card page works", async ({ page }) => {
  await page.goto("works/destiny-card");

  await page.waitForTimeout(1000);

  await expect(page).toHaveScreenshot();
});
