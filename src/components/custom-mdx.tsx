// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

const components = {
  pre: (props: any) => (
    <pre {...props} className="ring-1 ring-blue-500 dark:ring-[#423E61]">
      {props.children}
    </pre>
  ),
};

export const CustomMDX = (props: MDXRemoteProps) => {
  return (
    // @ts-expect-error
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
};
