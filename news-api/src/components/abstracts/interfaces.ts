import { LoadOptions, SourceInfo } from './types';
import { STATUSES } from './evetydayTypes';

export interface Article {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: SourceInfo;
}

export interface Source {
    category: string;
    country: string;
    description: string;
    url: string;
    id: string;
    language: string;
    name: string;
}

export interface NewsData {
    status: STATUSES;
    totalResults: number;
    articles: Article[];
}

export interface NewsSource {
    status: STATUSES;
    sources: Source[];
}

export interface LoaderInterface {
    baseLink: string | undefined;
    options: LoadOptions;
}
