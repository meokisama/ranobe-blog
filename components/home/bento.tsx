export default function Bento() {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="grid h-screen w-[95%] xl:w-[80%] grid-cols-5 gap-2 xl:gap-4">
        <div className="col-span-2 bento-item">Paradise Found</div>
        <div className="col-span-2 bento-item">History Unveiled</div>
        <div className="bento-item">Marrakesh Magic</div>
        <div className="bento-item">Cappadocia, Turkey</div>
        <div className="col-span-3 row-span-2">
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-xl lg:rounded-3xl border dark:border-white/[0.2] px-12 text-center overflow-hidden">
            <h1 className="text-6xl font-bold">Trsuxhxb</h1>
            <h3 className="text-3xl font-semibold">dfbgggtbhrhn</h3>
          </div>
        </div>
        <div className="row-span-2 bento-item">Paris: City of Lights</div>
        <div className="bento-item">Underwater Wonders</div>
        <div className="col-span-3 bento-item">
          Trek Through Lush Rainforests
        </div>
        <div className="bento-item">Canadian Rockies</div>
        <div className="bento-item">Explore More</div>
      </div>
    </div>
  );
}
