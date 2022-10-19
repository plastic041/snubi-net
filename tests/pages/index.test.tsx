import { render, screen } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import Home from "~/pages/index";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("index.tsx", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders index page correctly", async () => {
    render(<Home />);

    const heading = screen.getByRole("heading");
    const heroImage = screen.getByRole("img", {
      name: "메롱하는 귀여운 턱시도 고양이, 유화",
    });

    expect(heading).toBeInTheDocument();
    expect(heroImage).toBeInTheDocument();
  });
});
