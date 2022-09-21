import { GithubIcon } from "./icons";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-16 flex-shrink-0 items-center border-b dark:border-b-gray-500 sticky top-0 bg-gray-50 dark:bg-gray-700">
      <nav className="container mx-auto p-4 xl:px-40 flex flex-row justify-between items-center">
        <Link href="/">
          <a>
            <span className="text-3xl font-extrabold transition-colors hover:text-blue-500 text-gray-900 dark:text-gray-100 dark:hover:text-blue-300">
              Snubi
            </span>
          </a>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/posts">
            <a className="flex">
              <span className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
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
            <GithubIcon className="h-6 w-6 text-blue-500 dark:text-blue-300 hover:text-blue-700 transition-colors dark:hover:text-blue-400" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
