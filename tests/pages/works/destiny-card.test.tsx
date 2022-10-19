import { render } from "@testing-library/react";
import { describe, it, afterEach, vi } from "vitest";
import DestinyPage from "~/pages/works/destiny-card";

// // mock FontFace api
// const FontFace = vi.fn(() => ({
//   load: vi.fn(),
// }));

// vi.stubGlobal("FontFace", FontFace);

describe("destiny-card.tsx", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders works/destiny-card page correctly", async () => {
    // mock FontFace
    Object.defineProperty(window, "FontFace", {
      writable: true,
      value: class FontFace {
        constructor() {
          return {
            load: vi.fn(),
          };
        }
      },
    });

    // mock document.fonts.add
    Object.defineProperty(document, "fonts", {
      writable: true,
      value: {
        add: vi.fn(),
      },
    });

    // mock canvas getContext
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      writable: true,
      value: () => {
        return {
          fillRect: vi.fn(),
          drawImage: vi.fn(),
          fillStyle: vi.fn(),
          fillText: vi.fn(),
          measureText: () => {
            return {
              width: 0,
            };
          },
        };
      },
    });

    render(<DestinyPage />);
  });
});
