import { BaseComponent } from "../utils/baseComponents";
import { Header } from "../header/header";
import { MainWinners } from "../main/mainWinners";

export class PageWinners {
    private container: HTMLElement;

    constructor() {
        this.container = new BaseComponent({
            tag: "div",
            classNames: ["container", "container__winners"],
        }).getElement();
        this.createPage();
    }

    private createPage() {
        const header = new Header().getElement();
        const main = new MainWinners().getElement();
        this.container.append(header, main);
    }

    public getPage(): HTMLElement {
        return this.container;
    }
}
