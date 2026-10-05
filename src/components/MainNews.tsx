import Image from "next/image";
import { News } from "@/types/api";
import Link from "next/link";

const MainNews = ({ news }: { news: News[] }) => {
  const firstMainNews = news[0];
  const othersMainNews = news.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 items-stretch">
      {/* Main News */}
      <Link href={`/news/${firstMainNews.id}`}>
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm h-full">
            {/* Image */}
            <figure className="overflow-hidden">
              <Image
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                height={600}
                width={900}
                src={firstMainNews.imageUrl}
                alt={firstMainNews.imageAlt}
              />
            </figure>

            {/* Main News Content */}
            <div className="p-3">
              <p className="text-red-600 text-xl md:text-2xl font-semibold">
                {firstMainNews.category}
              </p>

              <div className="py-3">
                <h2 className="text-xl md:text-2xl font-bold transition-colors duration-300 hover:text-red-600 cursor-pointer">
                  {firstMainNews.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {firstMainNews.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Others News */}
      <div className="lg:col-span-1 h-full flex flex-col">
        {othersMainNews.slice(0, 5).map((omn) => (
          <Link key={omn.id} href={`/news/${omn.id}`}>
            <div className="bg-base-100 border border-gray-300 px-3 py-4 mb-3 cursor-pointer transition-all duration-200 hover:text-red-600 hover:translate-x-1">
              <p className="text-red-600 font-semibold">{omn.category}</p>
              <div className="font-medium mt-1">{omn.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
