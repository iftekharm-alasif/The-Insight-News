import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
import type { Headlines } from "@/types/api";

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");

  const data = await res.json();

  const marqueeHeadlines: Headlines[] = data.data;

  return (
    <div className="sticky top-0 z-40 my-3 text-white bg-black">
      <div className="flex max-w-7xl mx-auto">
        <div className="bg-black text-white py-1 text-2xl mx-2 px-2 shrink-0">
          সর্বশেষ
        </div>

        <MarqueeText className="py-2" direction="right" duration={11}>
          {marqueeHeadlines.map((mh) => (
            <Link href={`/news/${mh.id}`} key={mh.id}>
              <span className="mx-8 cursor-pointer text-white underline decoration-transparent decoration-1 underline-offset-4 transition-all duration-500 ease-in-out hover:decoration-white">
                {mh.title}
              </span>
              <span className="mx-4">•</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
