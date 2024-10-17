import { useEffect, useState } from "react";

type Grub = {
  label: string;
};

type GrubListProps = {
  grubs: Grub[];
};
export function GrubList({ grubs }: GrubListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key;

      if (key === "k" || key === "ArrowUp") {
        setCurrentIndex((prev) => (prev - 1 + grubs.length) % grubs.length);
      } else if (key === "j" || key === "ArrowDown") {
        setCurrentIndex((prev) => (prev + 1) % grubs.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <ul className="flex flex-col font-mono container">
      {grubs.map((grub, index) => (
        <GrubItem
          key={grub.label}
          grub={grub}
          isActive={currentIndex === index}
        />
      ))}
    </ul>
  );
}

type GrubItemProps = {
  grub: Grub;
  isActive?: boolean;
};
function GrubItem({ grub, isActive = false }: GrubItemProps) {
  return (
    <li
      className={`w-full text-center ${
        isActive
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-black dark:bg-black dark:text-white"
      }`}
    >
      {grub.label}
    </li>
  );
}
