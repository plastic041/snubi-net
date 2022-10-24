import Layout from "../components/layout";
import type { NextPage } from "next";
import heroCatPic from "~/../public/images/hero-cat.png";
import HeroImage from "~/components/hero-image";
import { OgHead } from "~/components/og";
import { type Og } from "~/typings/og";

const og: Og = {
  title: "Snubi.net",
  description: "Snubi.net",
  image: "https://snubi-net.vercel.app/images/hero-cat.png",
  url: "https://snubi-net.vercel.app",
};

const Home: NextPage = () => {
  return (
    <Layout>
      <OgHead og={og} />
      <div className="flex flex-col items-center gap-4 p-8">
        <HeroImage src={heroCatPic} alt="메롱하는 귀여운 턱시도 고양이, 유화" />
      </div>
    </Layout>
  );
};

export default Home;
