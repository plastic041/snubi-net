import "@testing-library/jest-dom";
import { describe, expect, it, afterEach, vi } from "vitest";

// mocking next/router
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
