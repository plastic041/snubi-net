import Layout from "../components/layout";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <Link href="/posts">
        <a>
          <div>hello</div>
        </a>
      </Link>
    </Layout>
  );
};

export default Home;
