import type { Metadata } from "next";
import { SoulsCard } from "./souls-card";
import "./styles.css";

export const metadata: Metadata = {
  title: "데스티니 무기 카드 생성기 | Snubi",
  description: "데스티니 무기 카드를 생성하는 웹 도구입니다.",
  openGraph: {
    images: "https://snubi-net.vercel.app/images/destiny-card/open-image.jpg",
    url: "https://snubi-net.vercel.app/works/destiny-card",
  },
  twitter: {
    images: "https://snubi-net.vercel.app/images/destiny-card/open-image.jpg",
  },
};

const SoulsCardPage = () => {
  return <SoulsCard />;
};

export default SoulsCardPage;
