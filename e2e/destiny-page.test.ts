import { test, expect } from "@playwright/test";
import { resolve } from "path";

test("works/destiny-card page works", async ({ page }, testInfo) => {
  await page.goto("works/destiny-card");

  await page.waitForTimeout(1000);
  testInfo.snapshotDir = resolve(__dirname, "destiny-card"); //  in current test folder creates new folder named "a.ts-snapshots"

  await expect(page).toHaveScreenshot();
});
