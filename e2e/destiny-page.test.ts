import { test, expect } from "@playwright/test";

test("works/destiny-card page works", async ({ page }) => {
  await page.goto("works/destiny-card");

  const downloadButton = page.getByText("다운로드");

  await downloadButton.isVisible();

  await expect(page).toHaveScreenshot();
});
