import { test, expect } from "@playwright/test";

test.describe("posts page", () => {
  test("글 목록 visible", async ({ page }) => {
    await page.goto("/posts");

    const posts = page.locator("[aria-label='글 목록']");

    await expect(posts).toBeVisible();
  });
});
