import { test, expect } from "@playwright/test";

test.describe("헤더의 현재 선택된 링크 확인", () => {
  test("알맞은 aria-current 속성 가지고 있음", async ({ page }) => {
    const ENABLED_SELECTOR = "nav div a span[aria-current='page']";
    const DISABLED_SELECTOR =
      "nav div a span:not([aria-current='page']):not([role='img'])";

    await page.goto("/works");

    const works = page.locator(ENABLED_SELECTOR);
    const posts = page.locator(DISABLED_SELECTOR);

    const worksText = await works.textContent();
    const postsText = await posts.textContent();

    expect(worksText).toBe("작업");
    expect(postsText).toBe("글");

    await page.goto("/posts");

    const works2 = page.locator(DISABLED_SELECTOR);
    const posts2 = page.locator(ENABLED_SELECTOR);

    const worksText2 = await works2.textContent();
    const postsText2 = await posts2.textContent();

    expect(worksText2).toBe("작업");
    expect(postsText2).toBe("글");
  });
});
