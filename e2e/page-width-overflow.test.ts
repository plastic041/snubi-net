import { test, expect } from "@playwright/test";

test.use({
  viewport: {
    width: 360,
    height: 740,
    // galaxy s8
  },
});

const getBodyWidths = () => {
  const body = document.querySelector("body")!;
  const clientWidth = body.clientWidth;
  const scrollWidth = body.scrollWidth;

  return {
    clientWidth,
    scrollWidth,
  };
};

test.describe("tests if pages width overflows on mobile", () => {
  test("index page", async ({ page }) => {
    await page.goto("/");

    const { clientWidth, scrollWidth } = await page.evaluate(getBodyWidths);

    expect(clientWidth).toBe(scrollWidth);
  });

  test("works/destiny-card", async ({ page }) => {
    await page.goto("/works/destiny-card");

    const { clientWidth, scrollWidth } = await page.evaluate(getBodyWidths);

    expect(clientWidth).toBe(scrollWidth);
  });

  test("works/spotify", async ({ page }) => {
    await page.goto("/works/spotify");

    const { clientWidth, scrollWidth } = await page.evaluate(getBodyWidths);

    expect(clientWidth).toBe(scrollWidth);
  });

  test("posts", async ({ page }) => {
    await page.goto("/posts");

    const { clientWidth, scrollWidth } = await page.evaluate(getBodyWidths);

    expect(clientWidth).toBe(scrollWidth);
  });

  test("posts/136", async ({ page }) => {
    await page.goto("/posts/136");

    const { clientWidth, scrollWidth } = await page.evaluate(getBodyWidths);

    expect(clientWidth).toBe(scrollWidth);
  });
});
