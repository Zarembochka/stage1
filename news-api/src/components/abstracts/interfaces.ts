import { LoadOptions, SourceInfo } from './types';
import { Statuses } from './evetydayTypes';

export interface Article {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: SourceInfo;
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
    status: Statuses;
    totalResults: number;
    articles: Article[];
}

export interface NewsSource {
    status: Statuses;
    sources: Source[];
}

export interface LoaderInterface {
    baseLink: string | undefined;
    options: LoadOptions;
}
