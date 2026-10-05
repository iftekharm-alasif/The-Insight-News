export interface Category {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

export interface CategoriesResponse {
  success: boolean;
  count: number;
  cachedAt: string;
  data: Category[];
}
export interface Headlines {
  id: string;
  title: string;
}
export interface News {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}
export interface OthersSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export interface NewsDetails {
  id: string;
  title: string;
  imageUrl: string;
  firstPublished: string;
  source: string;

  topics?: {
    name: string;
  }[];

  tags?: string[];

  description?: {
    blocks?: {
      model?: {
        blocks?: {
          model?: {
            text?: string;
          };
        }[];
      };
    }[];
  };

  body?: {
    type: string;
    text?: string;
    url?: string;
    caption?: string;
    width?: number;
    height?: number;
  }[];
}