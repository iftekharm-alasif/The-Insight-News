import OthersNews from "@/components/OthersNews";
import { News } from "@/types/api";

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  const data = await res.json();

  const categoryData: News[] = data.data;

  return (
    <div>
      <h1 className="text-2xl font-bold border-b-2 border-gray-300 m-5">
        {data.title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {categoryData.map((news) => (
          <OthersNews key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;