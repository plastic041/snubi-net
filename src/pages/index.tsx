import Layout from "../components/layout";
import type { NextPage } from "next";
import Image from "next/future/image";
import heroCatPic from "~/../public/images/hero-cat.png";

const Home: NextPage = () => {
  const title = `Snubi.net`;
  const description = `Snubi.net`;

  return (
    <Layout title={title} description={description}>
      <div className="flex flex-col items-center">
        <Image
          title="Hero cat"
          id="hero-cat"
          className="rounded-md shadow-lg"
          src={heroCatPic}
          placeholder="blur"
          width={400}
          height={400}
          alt="snubi.net hero image"
        />
      </div>
    </Layout>
  );
};

export default Home;
