import Link from "next/link";
import { GithubIcon } from "~/components/icons";
import { useIsActive } from "~/lib/hooks/use-is-active";

type CategoryProps = {
  name: string;
  href: string;
};
const CategoryItem = ({ name, href }: CategoryProps) => {
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

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-gray-50 dark:border-b-gray-500 dark:bg-gray-700">
      <nav className="container mx-auto flex flex-row items-center justify-between p-4 xl:px-40">
        <Link href="/">
          <span className="text-3xl font-extrabold text-gray-900 transition-colors hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-300">
            Snubi
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <CategoryItem name="μμ" href="/works" />
          <CategoryItem name="κΈ" href="/posts" />
          <a
            className="flex"
            href="https://github.com/plastic041"
            target="_blank"
            rel="noreferrer"
            title="snubi GitHub"
          >
            <GithubIcon className="h-6 w-6 text-blue-500 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
