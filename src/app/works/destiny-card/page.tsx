import type { Metadata } from "next";
import { DestinyCard } from "./destiny-card";
import "./styles.css";

export const metadata: Metadata = {
  title: "다크소울 아이템 카드 생성기 | Snubi",
  description: "다크소울 아이템 카드를 생성하는 웹 도구입니다.",
  openGraph: {
    images: "https://snubi-net.vercel.app/images/souls-card/open-image.jpg",
    url: "https://snubi-net.vercel.app/works/soul-card",
  },
  twitter: {
    images: "https://snubi-net.vercel.app/images/souls-card/open-image.jpg",
  },
};

const DestinyCardPage = () => {
  return <DestinyCard />;
};

export default DestinyCardPage;
