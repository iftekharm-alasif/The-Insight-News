
import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";
import MostReadSection from "@/components/MostReadSection";
import OthersNews from "@/components/OthersNews";
import { OthersSection } from "@/types/api";

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  const data = await res.json();

  const newsSec = data.data;

  const mainNews = newsSec[0].articles;

  const othersNewssection: OthersSection[] = newsSec.slice(1);

  return (
    <div>
      {/* <Marquee /> */}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-3 sm:px-4">
        
        {/* News Section */}
        <div className="lg:col-span-2">
          <MainNews news={mainNews} />

          <div className="mt-5">
            {othersNewssection.map((osn) => (
              <div key={osn.curationId} className="mb-8">
                
                {/* Section Title */}
                <h1 className="text-[25px]  font-bold py-2 border-b-4 border-gray-600">
                  {osn.title}
                </h1>

                {/* News Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {osn.articles.map((news) => (
                    <OthersNews
                      key={news.id}
                      news={news}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Read Section */}
        <div className="lg:col-span-1">
          <MostReadSection></MostReadSection>
        </div>
      </div>
    </div>
  );
}
