import { News } from './news/news';
import { Sources } from './sources/sources';
import { NewsData, NewsSource } from '../abstracts/interfaces';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: NewsSource): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}
