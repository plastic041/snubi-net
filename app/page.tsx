import heroCatPic from "./hero-cat.png";
import HeroImage from "~/components/hero-image";

const Home = () => {
  return (
    <>
      <div
        className="aria-asc:bg-blue-700 flex flex-col items-center gap-4 p-8"
        aria-checked
      >
        <HeroImage src={heroCatPic} alt="메롱하는 귀여운 턱시도 고양이, 유화" />
      </div>
    </>
  );
};

export default Home;
