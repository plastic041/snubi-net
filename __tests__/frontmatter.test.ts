import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import type { Frontmatter } from "~/typings/frontmatter";

describe("frontmatter", () => {
  it("markdown files should have frontmatter", async () => {
    const postsPath = join(process.cwd(), "./src/posts/");
    const filenames = await readdir(postsPath);
    const fms = await Promise.all(
      filenames.map(async (filename) => {
        const text = await readFile(join(postsPath, filename), {
          encoding: "utf8",
        });
        const { data: frontmatter } = matter(text) as unknown as {
          data: Frontmatter;
        };

        return frontmatter;
      })
    );

    const schema = z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      created_at: z.string(),
      tags: z.array(z.string()),
      is_draft: z.boolean(),
    });

    fms.forEach((fm) => {
      expect(schema.parse(fm)).toBeTruthy();
    });
  });
});
