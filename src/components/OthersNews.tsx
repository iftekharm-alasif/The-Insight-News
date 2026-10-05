import Image from "next/image";
import { News } from "@/types/api";
import Link from "next/link";

const OthersNews = ({ news }: { news: News }) => {
  return (
   <Link href={`/news/${news.id}`}>
    <div className="w-full h-full">
      <div className="card bg-base-100 my-3 sm:my-4 shadow-sm overflow-hidden h-full flex flex-col">
        <figure className="overflow-hidden">
          <Image
            className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 hover:scale-105"
            height={600}
            width={600}
            src={news.imageUrl}
            alt={news.imageAlt}
          />
        </figure>

        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <p className="text-red-600 text-sm sm:text-base font-semibold">
            {news.category}
          </p>

          <div className="mt-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 hover:text-red-600 cursor-pointer">
              {news.title}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-600 line-clamp-3">
              {news.description}
            </p>
          </div>
        </div>
      </div>
    </div>
   </Link>
  );
};

export default OthersNews;
