import Layout from "~/components/layout";

const WorksPage = () => {
  return (
    <Layout title="작업 | Snubi" description="작업">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          작업
        </h1>
        <p className="text-gray-500 dark:text-gray-400">준비중입니다.</p>
      </div>
    </Layout>
  );
};

export default WorksPage;
