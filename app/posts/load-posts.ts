import { Frontmatter } from "~/typings/frontmatter";

import TauriContent, {
  // @ts-expect-error
  fm as tauriFm,
} from "~/posts/tauri-sqlite-diesel-r2d2.mdx";
import type { ReactNode } from "react";

type Post = {
  frontmatter: Frontmatter;
  content: ReactNode;
};

export const loadPosts = (): Post[] => {
  const posts: Post[] = [
    {
      frontmatter: tauriFm,
      content: TauriContent as unknown as ReactNode,
    },
  ];

  return posts;
};
