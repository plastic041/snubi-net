import { test, expect } from "@playwright/test";

test.describe("tests if page has <title>", () => {
  test("index page", async ({ page }) => {
    await page.goto("/");

    const title = await page.title();

    expect(title.includes("Snubi")).toBe(true);
  });

  test("works/destiny-card", async ({ page }) => {
    await page.goto("/works/destiny-card");

    const title = await page.title();

    expect(title.includes("Snubi")).toBe(true);
  });

  test("works/spotify", async ({ page }) => {
    await page.goto("/works/spotify");

    const title = await page.title();

    expect(title.includes("Snubi")).toBe(true);
  });

  test("posts", async ({ page }) => {
    await page.goto("/posts");

    const title = await page.title();

    expect(title.includes("Snubi")).toBe(true);
  });

  test("posts/136", async ({ page }) => {
    await page.goto("/posts/136");

    const title = await page.title();

    expect(title.includes("Snubi")).toBe(true);
  });
});
