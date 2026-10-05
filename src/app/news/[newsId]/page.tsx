import Image from "next/image";
import { NewsDetails } from "@/types/api";

const DetailsNews = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  console.log("NEWS ID:", newsId);

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`
  );

  const data = await res.json();

  const news: NewsDetails = data.data;

  if (!news) {
    return <div>News not found</div>;
  }



  return (
    <main className="bg-gray-50 min-h-screen py-6 sm:py-8">
      <article className="max-w-4xl mx-auto px-4">
        {/* Category */}
        <p className="text-gray-600 font-bold text-sm sm:text-base mb-3">
          {news.topics?.[0]?.name}
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
          {news.title}
        </h1>

        {/* Description */}
        <p className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed">
          {news.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ||
            ""}
        </p>

        {/* Published Info */}
        <div className="flex flex-wrap items-center gap-3 mt-5 pb-5 border-b border-gray-300 text-sm text-gray-500">
          <span>
            প্রকাশিত:{" "}
            {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
              dateStyle: "long",
            })}
          </span>

          <span>•</span>

          <span>{news.source}</span>
        </div>

        {/* Main Image */}
        <div className="mt-6 overflow-hidden rounded-xl">
          <Image
            src={news.imageUrl}
            alt={news.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Image Caption */}
        <p className="text-sm text-gray-500 mt-2">
          {news.body?.find((item) => item.type === "image")?.caption}
        </p>

        {/* Article Body */}
        <div className="mt-8 bg-white rounded-xl p-5 sm:p-8 shadow-sm">
          {news.body?.map((item, index) => {
            if (item.type === "text") {
              return (
                <p
                  key={index}
                  className="text-base sm:text-lg leading-8 text-gray-800 mb-6"
                >
                  {item.text}
                </p>
              );
            }

            if (item.type === "subheading") {
              return (
                <h2
                  key={index}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4"
                >
                  {item.text}
                </h2>
              );
            }

            if (item.type === "image") {
              return (
                <figure key={index} className="my-8">
                  <Image
                    src={item.url || ""}
                    alt={item.caption || news.title}
                    width={item.width || 1024}
                    height={item.height || 576}
                    className="w-full h-auto rounded-lg"
                  />

                  {item.caption && (
                    <figcaption className="text-sm text-gray-500 mt-2">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6 pb-10">
          {news.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
};

export default DetailsNews;