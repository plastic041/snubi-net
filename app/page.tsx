import type { Metadata, NextPage } from "next";
import heroCatPic from "../public/images/hero-cat.png";
import HeroImage from "src/components/hero-image";

export const metadata: Metadata = {
  title: "Snubi.net",
  description: "Snubi.net",
  openGraph: {
    images: "https://snubi-net.vercel.app/images/hero-cat.png",
    url: "https://snubi-net.vercel.app",
  },
  twitter: {
    images: "https://snubi-net.vercel.app/images/hero-cat.png",
  },
};

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-8">
        <HeroImage src={heroCatPic} alt="메롱하는 귀여운 턱시도 고양이, 유화" />
      </div>
    </>
  );
};

export default Home;
