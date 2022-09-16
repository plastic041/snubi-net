import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-16 flex-shrink-0 items-center border-b p-4">
      <Link href="/">
        <a>
          <span className="text-3xl font-extrabold transition-colors hover:text-blue-500 text-gray-900 dark:text-gray-100 dark:hover:text-blue-300">
            Snubi.net
          </span>
        </a>
      </Link>
    </header>
  );
};

export default Header;
