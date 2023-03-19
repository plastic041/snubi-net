import { test, expect } from "@playwright/test";

test("404 page", async ({ page }) => {
  await page.goto("/posts/should-be-404");

  const labelNotFound = page.getByText("존재하지 않는 페이지입니다.");

  await expect(labelNotFound).toBeVisible();
});
