import { describe, expect, it } from "vitest";
import { sum } from "~/lib/sum";

describe("sum", () => {
  it("should add two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
