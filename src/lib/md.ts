import rehyperSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const md2html = async (md: string) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehyperSanitize)
    .use(rehypeStringify)
    .process(md);

  return html.toString();
};
