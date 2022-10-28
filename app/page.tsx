import heroCatPic from "./hero-cat.png";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex overflow-hidden rounded shadow-lg">
          <Image
            className="scale-105 overflow-hidden"
            src={heroCatPic}
            width={400}
            height={400}
            placeholder="blur"
            alt="메롱하는 귀여운 턱시도 고양이, 유화"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
