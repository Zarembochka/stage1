import './news.css';
import { Article } from '../../abstracts/interfaces';

class News {
    public draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

                if (idx % 2) newsClone.querySelector<HTMLElement>('.news__item')?.classList.add('alt');

                const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (photo) {
                    photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
                if (author) {
                    author.textContent = item.author || item.source.name;
                }
                const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
                if (date) {
                    date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }
                const title = newsClone.querySelector<HTMLElement>('.news__description-title');
                if (title) {
                    title.textContent = item.title;
                }
                const source = newsClone.querySelector<HTMLElement>('.news__description-source');
                if (source) {
                    source.textContent = item.source.name;
                }
                const content = newsClone.querySelector<HTMLElement>('.news__description-content');
                if (content) {
                    content.textContent = item.description;
                }
                newsClone.querySelector<HTMLElement>('.news__read-more a')?.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const newsDiv = document.querySelector<HTMLElement>('.news');
        if (newsDiv) {
            newsDiv.innerHTML = '';
            newsDiv.appendChild(fragment);
        }
    }
}

export default News;
