import { CategoryItem } from "./category-item";
import Link from "next/link";
import { GithubIcon } from "~/components/icons";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-gray-50 dark:border-b-gray-500 dark:bg-gray-700">
      <nav className="container mx-auto flex flex-row items-center justify-between p-4 xl:px-40">
        <Link href="/">
          <span className="text-g-900 text-3xl font-extrabold transition-colors hover:text-blue-500 dark:hover:text-blue-300">
            Snubi
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <CategoryItem name="작업" href="/works" />
          <CategoryItem name="글" href="/posts" />
          <a
            className="flex"
            href="https://github.com/plastic041"
            target="_blank"
            rel="noreferrer"
            title="snubi GitHub"
          >
            <GithubIcon className="text-b-500 h-6 w-6 transition-colors hover:text-blue-700 dark:hover:text-blue-400" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
