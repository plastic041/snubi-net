import { test, expect } from "@playwright/test";

test("404 page", async ({ page }) => {
  await page.goto("/posts/should-be-404");

  const label404 = page.getByText("404");

  await expect(label404).toBeVisible();
});
