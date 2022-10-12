import { z } from "zod";
import { Frontmatter } from "~/typings/frontmatter";

const Fm = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  created_at: z.string(),
  is_draft: z.boolean(),
  tags: z.array(z.string()),
});

export const validateFrontmatter = (fm: any): fm is Frontmatter => {
  if (!fm) {
    return false;
  }

  const result = Fm.safeParse(fm);

  return result.success;
};
