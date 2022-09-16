import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import rehyperSanitize from "rehype-sanitize";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

export const md2html = async (md: string) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehyperSanitize)
    .use(rehypeStringify)
    .process(md);

  return html;
};
