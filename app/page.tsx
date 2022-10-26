import heroCatPic from "./hero-cat.png";
import type { NextPage } from "next";
import HeroImage from "~/components/hero-image";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-8">
        <HeroImage src={heroCatPic} alt="메롱하는 귀여운 턱시도 고양이, 유화" />
        assdas
      </div>
    </>
  );
};

export default Home;
