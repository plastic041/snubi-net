import { useRouter } from "next/router";

export const useIsActive = (href: string) => {
  const router = useRouter();

  return router.pathname.startsWith(href);
};
