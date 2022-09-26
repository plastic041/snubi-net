import ConstructionCat from "~/../public/images/construction-cat.png";
import HeroImage from "~/components/hero-image";
import Layout from "~/components/layout";

const WorksPage = () => {
  return (
    <Layout title="작업 | Snubi" description="작업 모음">
      <div className="flex flex-col items-center gap-4 p-8">
        <HeroImage src={ConstructionCat} alt="안전모를 쓴 고양이" />
        <p className="text-gray-500 dark:text-gray-400">공사중입니다.</p>
      </div>
    </Layout>
  );
};

export default WorksPage;
