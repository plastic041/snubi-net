import { test, expect } from "@playwright/test";

test.describe("works page", () => {
  test("works visible", async ({ page }) => {
    await page.goto("/works");

    const works = page.locator("main a");

    await expect(works).toBeVisible();
  });

  test("works/destiny renders correctly", async ({ page }) => {
    await page.goto("/works/destiny-card");

    const canvas = page.locator("canvas");

    await expect(canvas).toBeVisible();
  });

  test("works/souls renders correctly", async ({ page }) => {
    await page.goto("/works/souls-card");

    const canvas = page.locator("canvas");

    await expect(canvas).toBeVisible();
  });

  test("works/spotify has 10 aria-label='노래 정보'", async ({ page }) => {
    await page.goto("/works/spotify");

    // wait for the api call to finish
    await page.waitForSelector("[aria-label='많이 들은 노래 10곡']", {
      timeout: 5000,
    });

    const trackCards = page.locator("[aria-label='노래 정보']");
    const count = await trackCards.count();
    expect(count).toBe(10);
  });
});
