import Image from "next/image";
import ConstructionCat from "~/../public/images/construction-cat.png";
import Layout from "~/components/layout";

const WorksPage = () => {
  return (
    <Layout title="작업 | Snubi" description="작업 모음">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex overflow-hidden rounded shadow-lg">
          <Image
            className="scale-105 transform overflow-hidden"
            src={ConstructionCat}
            width={400}
            height={400}
            alt="안전모를 쓴 고양이"
          />
        </div>
        <p className="text-gray-500 dark:text-gray-400">준비중입니다.</p>
      </div>
    </Layout>
  );
};

export default WorksPage;
