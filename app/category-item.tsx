"use client";

import Link from "next/link";
import { useIsActive } from "~/lib/hooks/use-is-active";

type CategoryProps = {
  name: string;
  href: string;
};
export const CategoryItem = ({ name, href }: CategoryProps) => {
  const isActive = useIsActive(href);

  return (
    <Link href={href} className="flex">
      <span
        className="border-blue-500 text-blue-500 underline-offset-2 transition-colors hover:text-blue-700 dark:border-blue-300 dark:text-blue-300 dark:hover:text-blue-400 [&[aria-current='page']]:border-b-2"
        aria-current={isActive && "page"}
      >
        {name}
      </span>
    </Link>
  );
};
