import { render } from "@testing-library/react";
import { describe, it, afterEach, vi } from "vitest";
import WorksPage from "~/pages/works/index";

vi.mock(
  "next/future/image",
  vi.fn(() => ({
    // eslint-disable-next-line jsx-a11y/alt-text
    default: vi.fn(() => <img />),
  }))
);

describe("works/index.tsx", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders works/index page correctly", async () => {
    render(<WorksPage />);
  });
});
