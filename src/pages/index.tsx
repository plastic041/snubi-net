import Layout from "../components/layout";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const title = `Snubi.net`;
  const description = `Snubi.net`;

  return (
    <Layout title={title} description={description}>
      <Link href="/posts">
        <a>
          <div>hello</div>
        </a>
      </Link>
    </Layout>
  );
};

export default Home;
