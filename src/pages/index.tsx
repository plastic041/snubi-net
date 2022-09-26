import Layout from "../components/layout";
import type { NextPage } from "next";
import heroCatPic from "~/../public/images/hero-cat.png";
import HeroImage from "~/components/hero-image";

const Home: NextPage = () => {
  const title = `Snubi.net`;
  const description = `Snubi.net`;

  return (
    <Layout title={title} description={description}>
      <div className="flex flex-col items-center gap-4 p-8">
        <HeroImage src={heroCatPic} alt="메롱하는 귀여운 턱시도 고양이, 유화" />
      </div>
    </Layout>
  );
};

export default Home;
