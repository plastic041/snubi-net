import Layout from "./layout";

type LayoutProps = {
  children: React.ReactElement;
};
const PostLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <div className="prose">{children}</div>
    </Layout>
  );
};

export default PostLayout;
