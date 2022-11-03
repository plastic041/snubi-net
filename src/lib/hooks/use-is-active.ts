import { useRouter } from "next/router";

export const useIsActive = (href: string) => {
  const router = useRouter();

  const currentPathname = router.pathname.split("/")[1]; // remove the first slash
  const isActive = currentPathname === href.split("/")[1];

  return isActive;
};
