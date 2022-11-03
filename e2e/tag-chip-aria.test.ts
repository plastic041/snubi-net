import { test, expect } from "@playwright/test";

test("글 목록 태그 aria-current 테스트", async ({ page }) => {
  await page.goto("/posts");

  const currentTagChip = page.locator(
    "[aria-current='true'] span:nth-child(1)"
  );
  const currentTagChipText = await currentTagChip.textContent();

  expect(currentTagChipText).toBe("#모든 글");
});
