import { BaseComponent } from "../utils/baseComponents";
import { Header } from "../header/header";
import { MainGarage } from "../main/mainGarage";
import { Footer } from "../footer/footer";

export class PageGarage {
    private container: HTMLElement;

    public mainGarage: MainGarage;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__garage"] }).getElement();
        this.mainGarage = new MainGarage();
        this.createPage();
    }

    private createPage() {
        const header = new Header().getElement();
        const footer = new Footer().getElement();
        this.container.append(header, this.mainGarage.getElement(), footer);
    }

    public getPage(): HTMLElement {
        return this.container;
    }

    public getCurrentPage(): number {
        return this.mainGarage.getCurrentPage();
    }

    public getCarsPerPage(): number {
        return this.mainGarage.getCarsPerPage();
    }
}
