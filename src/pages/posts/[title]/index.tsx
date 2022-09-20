import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { join } from "path";
import Layout from "~/components/layout";
import { md2html } from "~/lib/md";
import type { Frontmatter } from "~/typings/frontmatter";

export const getStaticProps: GetStaticProps = async (context) => {
  const title = context.params?.title as string | undefined;

  if (!title) {
    return {
      notFound: true,
    };
  }

  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const postsAll = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: frontmatter } = matter(text) as unknown as {
        data: Frontmatter;
      };

      return {
        filename,
        frontmatter,
      };
    })
  );

  const post = postsAll.find(({ frontmatter }) => frontmatter.slug === title);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const text = await readFile(join(postsPath, post.filename), {
    encoding: "utf8",
  });
  const { content, data: frontmatter } = matter(text) as unknown as {
    content: string;
    data: Frontmatter;
  };

  if (frontmatter.is_draft) {
    return {
      notFound: true,
    };
  }

  const html = await md2html(content);

  return {
    props: {
      html: String(html),
      frontmatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsPath = join(process.cwd(), "./src/posts/");
  const postsFilenames = await readdir(postsPath);
  const frontmattersAll = await Promise.all(
    postsFilenames.map(async (filename) => {
      const text = await readFile(join(postsPath, filename), {
        encoding: "utf8",
      });
      const { data: frontmatter } = matter(text) as unknown as {
        data: Frontmatter;
      };

      return frontmatter;
    })
  );

  const frontmattersPublished = frontmattersAll.filter(
    (frontmatter) => !frontmatter.is_draft
  );

  const paths = frontmattersPublished.map((fm) => ({
    params: { title: fm.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  html: string;
  frontmatter: Frontmatter;
};
const PostPage = ({ html, frontmatter }: Props) => {
  const title = `${frontmatter.title} | Snubi`;

  return (
    <Layout title={title} description={frontmatter.description}>
      <article className="flex flex-1 flex-col gap-16 p-4 lg:grid lg:grid-cols-3">
        <motion.div
          className="top-2 col-span-1 flex flex-col gap-2 self-start lg:sticky -mt-8"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/posts">
            <a className="flex gap-2 items-center text-gray-500 transition-color hover:text-gray-900 duration-200 dark:text-gray-200 dark:hover:text-gray-400 self-start">
              <ArrowUturnLeftIcon className="w-4 h-4" />
              <span>목록으로</span>
            </a>
          </Link>
          <h1 className="break-words text-4xl font-extrabold [word-break:keep-all] text-gray-900 dark:text-gray-100">
            {frontmatter.title}
          </h1>
          <p className="text-gray-700 hidden lg:block dark:text-gray-200">
            {frontmatter.description}
          </p>
          <time
            dateTime={frontmatter.created_at}
            className="text-gray-700 dark:text-gray-200"
          >
            {frontmatter.created_at}
          </time>
        </motion.div>
        <div
          className="prose col-span-2 dark:prose-invert break-words [word-break:keep-all] whitespace-pre-wrap flex flex-col"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </Layout>
  );
};

export default PostPage;
