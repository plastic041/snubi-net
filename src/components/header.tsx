import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-16 flex-shrink-0 items-center border-b dark:border-b-gray-500">
      <nav className="container mx-auto p-4 xl:px-40 flex flex-row justify-between items-center">
        <Link href="/">
          <a>
            <span className="text-3xl font-extrabold transition-colors hover:text-blue-500 text-gray-900 dark:text-gray-100 dark:hover:text-blue-300">
              Snubi.net
            </span>
          </a>
        </Link>
        <div className="flex flex-row gap-2">
          <Link href="/posts">
            <a>
              <span className="text-blue-500 dark:text-blue-300">글 목록</span>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
