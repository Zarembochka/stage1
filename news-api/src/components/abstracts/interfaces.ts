export interface Article {
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
    draw(data: Article[]): void;
}

export interface Source {
    category: string;
    country: string;
    description: string;
    url: string;
    id: string;
    language: string;
    name: string;
    draw(data: Source[]): void;
}

export interface NewsData {
    status: 'string';
    totalResults: number;
    articles: Article[];
}

export interface NewsSource {
    status: 'string';
    sources: Source[];
}
