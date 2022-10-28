export const TrackCardLoader = () => (
  <div className="flex animate-pulse gap-4 border-gray-300 p-4" aria-hidden>
    <div className="h-[60px] w-[60px] rounded bg-slate-200 md:rounded-lg" />
    <div className="flex flex-1 flex-col justify-center gap-4">
      <div className="h-4 w-64 rounded bg-slate-200" />
      <div className="h-4 w-32 rounded bg-slate-200" />
    </div>
  </div>
);

const Page = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">많이 들은 노래</h2>
        </div>
        <div className="flex flex-col">
          <TrackCardLoader />
          <TrackCardLoader />
          <TrackCardLoader />
          <TrackCardLoader />
          <TrackCardLoader />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
          <h2 className="text-4xl font-extrabold">지금 듣고 있는 노래</h2>
          <TrackCardLoader />
        </div>
      </section>
    </div>
  );
};

export default Page;
