import Link from "next/link";
import type { Category } from "@/types/api";

const Navlinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");

  const data = await res.json();

  const navs: Category[] = data.data;

  const filterednavs = navs.filter((navdata) => navdata.scrapable);

  return (
    <div className="flex gap-3 sm:gap-5 justify-start sm:justify-center overflow-x-auto whitespace-nowrap px-3 pb-2 text-sm sm:text-[17px]">
      <Link
        href="/"
        className="shrink-0 text-gray-500 transition-all duration-200 hover:text-black hover:scale-110 inline-block"
      >
        হোম
      </Link>

      {filterednavs.map((navdata) => (
        <Link
          key={navdata.slug}
          href={`/category/${navdata.slug}`}
          className="shrink-0 text-gray-600 transition-all duration-200 hover:text-black hover:scale-110 inline-block"
        >
          {navdata.title}
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;