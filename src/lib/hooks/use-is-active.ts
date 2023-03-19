import { usePathname } from "next/navigation";

export const useIsActive = (href: string) => {
  const pathname = usePathname();

  if (!pathname) return false;

  const currentPathname = pathname.split("/")[1]; // remove the first slash
  const isActive = currentPathname === href.split("/")[1];

  return isActive;
};
