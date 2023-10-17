import { test, expect } from "@playwright/test";

test("GitHub link works", async ({ page, context }) => {
  await page.goto("/");

  const gitHubLink = page.locator(`a[title="Go to snubi's GitHub"]`);

  await expect(gitHubLink).toBeVisible();

  await gitHubLink.click();

  const newPage = await context.waitForEvent("page");

  expect(newPage.url()).toBe("https://github.com/plastic041/snubi-net");
});
