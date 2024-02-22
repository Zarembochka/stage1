import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsSource, NewsData } from '../abstracts/interfaces';
import { hideSources } from '../../burger';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sources = document.querySelector<HTMLElement>('.sources');
        if (sources) {
            sources.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data))
            );
            sources.addEventListener('click', hideSources);
            this.controller.getSources((data: NewsSource) => this.view.drawSources(data));
        }
    }
}

export default App;
