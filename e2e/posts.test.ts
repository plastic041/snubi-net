import { test, expect } from "@playwright/test";

test.describe("posts page", () => {
  test("글 목록 visible", async ({ page }) => {
    await page.goto("/posts");

    const posts = page.locator("[aria-label='글 목록']");

    await expect(posts).toBeVisible();
  });

  test("move to page", async ({ page }) => {
    await page.goto("/posts");

    const posts = page.locator("[aria-label='글 목록']");

    await posts.nth(0).click();

    const title = page.locator("h1");

    await expect(title).toBeVisible();
  });
});
