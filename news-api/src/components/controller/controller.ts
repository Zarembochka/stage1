import { AppLoader } from './appLoader';
import { ENDPOINTS } from '../abstracts/evetydayTypes';
import { NewsSource, NewsData } from '../abstracts/interfaces';
import { CallBackType } from '../abstracts/types';

class AppController extends AppLoader {
    public getSources(callback: CallBackType<NewsSource>): void {
        super.getResp(
            {
                endpoint: ENDPOINTS.sourses,
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallBackType<NewsData>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    if (sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                    }
                    super.getResp(
                        {
                            endpoint: ENDPOINTS.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export { AppController };
