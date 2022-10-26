import heroCatPic from "./hero-cat.png";
import Image from "next/image";

// import HeroImage from "~/components/hero-image";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-8">
        <Image
          // src={heroCatPic}
          src="/images/hero-cat.png"
          alt="메롱하는 귀여운 턱시도 고양이, 유화"
          width={500}
          height={500}
        />
      </div>
    </>
  );
};

export default Home;
