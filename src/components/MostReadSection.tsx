import { Headlines } from "@/types/api";
import Link from "next/link";
const MostReadSection = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");

  const data = await res.json();

  // console.log(data);

  const mostRead: Headlines[] = data.data;

  console.log(mostRead);

  return (
    <div className="w-full">
      <div
        className="
          card
    
          sm:p-4
          bg-base-500
          border
          border-gray-300
          shadow-sm
          transition-all
          duration-300
          hover:shadow-lg
        "
      >
        <h1
          className="
            font-bold
            text-red-500
            text-lg
            sm:text-xl
            mb-3
            sm:mb-4
            border-b
            border-gray-00
            pb-2
          "
        >
          সর্বাধিক পঠিত
        </h1>

        <div className="grid gap-2 sm:gap-3">
          {mostRead.map((mr) => (
            <Link
              key={mr.id}
              href={`/news/${mr.id}`}
              className="block no-underline"
            >
              <div
                className="
        p-2
        sm:p-3
        border-b
        border-gray-200
        cursor-pointer
        transition-all
        duration-300
        hover:translate-x-1
        hover:bg-gray-50
      "
              >
                <h2
                  className="
          text-sm
          sm:text-base
          md:text-lg
          font-semibold
          leading-snug
          transition-colors
          duration-300
          hover:text-red-600
        "
                >
                  {mr.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostReadSection;
