import { GithubIcon } from "./icons";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 flex-shrink-0 items-center border-b bg-gray-50 dark:border-b-gray-500 dark:bg-gray-700 z-10">
      <nav className="container mx-auto flex flex-row items-center justify-between p-4 xl:px-40">
        <Link href="/">
          <a>
            <span className="text-3xl font-extrabold text-gray-900 transition-colors hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-300">
              Snubi
            </span>
          </a>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/posts">
            <a className="flex">
              <span className="text-blue-500 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400">
                글 목록
              </span>
            </a>
          </Link>

          <a
            className="flex"
            href="https://github.com/plastic041"
            target="_blank"
            rel="noreferrer"
            title="snubi Github"
          >
            <GithubIcon className="h-6 w-6 text-blue-500 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
