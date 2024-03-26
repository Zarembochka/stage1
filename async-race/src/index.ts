import "./main.scss";
import { PageGarage } from "./view/pages/pageGarage";
import { PageWinners } from "./view/pages/pageWinners";
import { ViewPAGE } from "./view/utils/enums";

class App {
    public pageGarage: PageGarage;

    public pageWinners: PageWinners;

    constructor() {
        this.pageGarage = new PageGarage();
        this.pageWinners = new PageWinners();
    }

    private renderPage(page: PageGarage | PageWinners): void {
        document.body.innerHTML = "";
        document.body.append(page.getPage());
    }

    public render(view: ViewPAGE): void {
        if (view === ViewPAGE.winners) {
            this.renderPage(this.pageWinners);
            return;
        }
        this.pageWinners.removeWinners();
        this.renderPage(this.pageGarage);
    }
}

export const app = new App();
app.render(ViewPAGE.garage);
