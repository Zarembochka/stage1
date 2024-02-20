export interface NewsData {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: {
        id: string;
        name: string;
    };
}

export interface NewsSource {
    category: string;
    country: string;
    description: string;
    url: string;
    id: string;
    language: string;
    name: string;
}
