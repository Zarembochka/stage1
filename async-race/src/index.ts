import "./main.scss";
import { PageGarage } from "./view/pages/pageGarage";
import { PageWinners } from "./view/pages/pageWinners";
import { ViewPAGE } from "./view/utils/enums";

class App {
    public pageGarage: PageGarage;

    public pageWinners: PageWinners;

    private view: ViewPAGE;

    constructor() {
        this.pageGarage = new PageGarage();
        this.pageWinners = new PageWinners();
        this.view = ViewPAGE.garage;
    }

    private renderPage(page: PageGarage | PageWinners): void {
        document.body.innerHTML = "";
        document.body.append(page.getPage());
    }

    public render(view: ViewPAGE): void {
        if (view === ViewPAGE.winners) {
            this.view = ViewPAGE.winners;
            this.renderPage(this.pageWinners);
            return;
        }
        this.view = ViewPAGE.garage;
        this.pageWinners.removeWinners();
        this.renderPage(this.pageGarage);
    }

    public goToTheNextPage(): void {
        if (this.view === ViewPAGE.garage) {
            this.pageGarage.mainGarage.goToTheNextPage();
            return;
        }
        this.pageWinners.mainWinners.goToNextPage();
    }

    public goToThePreviousPage(): void {
        if (this.view === ViewPAGE.garage) {
            this.pageGarage.mainGarage.goToThePreviousPage();
            return;
        }
        this.pageWinners.mainWinners.goToPreviousPage();
    }
}

export const app = new App();
app.render(ViewPAGE.garage);
