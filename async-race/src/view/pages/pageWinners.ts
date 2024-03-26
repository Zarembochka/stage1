import { BaseComponent } from "../utils/baseComponents";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { MainWinners } from "../main/mainWinners";

export class PageWinners {
    private container: HTMLElement;

    public mainWinners: MainWinners;

    constructor() {
        this.container = new BaseComponent({
            tag: "div",
            classNames: ["container", "container__winners"],
        }).getElement();
        this.mainWinners = new MainWinners();
        this.createPage();
    }

    private createPage() {
        const header = new Header().getElement();
        const footer = new Footer().getElement();
        this.container.append(header, this.mainWinners.getElement(), footer);
    }

    private renderWinners(): void {
        this.mainWinners.renderWinners();
    }

    public getPage(): HTMLElement {
        this.renderWinners();
        return this.container;
    }

    public removeWinners(): void {
        this.mainWinners.removeWinners();
    }
}
