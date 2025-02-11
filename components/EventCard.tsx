import Bridge from "./Icons/Bridge";
import Logo from "./Icons/Logo";

// =============================
// 📌 イベント概要カードコンポーネント
// =============================
const EventCard = () => (
  <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight">
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <Bridge />
    </div>
    <Logo />
    <h1 className="mt-8 mb-4 text-base font-bold tracking-widest uppercase">2022 Event Photos</h1>
    <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
      Our incredible Next.js community got together in San Francisco for our first-ever in-person conference!
    </p>
  </div>
);

export default EventCard;
