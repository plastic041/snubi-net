import { test, expect } from "@playwright/test";

test.describe("헤더의 현재 선택된 아이템에만 밑줄", () => {
  test("알맞은 aria-current 속성 가지고 있음", async ({ page }) => {
    await page.goto("/works");

    const works = page.locator("[aria-current='page']");
    const posts = page.locator("[aria-current='false']");

    const worksText = await works.textContent();
    const postsText = await posts.textContent();

    expect(worksText).toBe("작업");
    expect(postsText).toBe("글");
  });
});
