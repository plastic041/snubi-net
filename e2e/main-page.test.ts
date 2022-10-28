import { test, expect } from "@playwright/test";

test("main page renders", async ({ page }) => {
  await page.goto("/");

  const image = page.locator("[alt='메롱하는 귀여운 턱시도 고양이, 유화']");

  await expect(image).toBeVisible();
});
