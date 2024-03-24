import { BaseComponent } from "../utils/baseComponents";
import { Header } from "../header/header";
import { MainGarage } from "../main/mainGarage";

export class PageGarage {
    private container: HTMLElement;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__garage"] }).getElement();
        this.createPage();
    }

    private createPage() {
        const header = new Header().getElement();
        const main = new MainGarage().getElement();
        this.container.append(header, main);
    }

    public getPage(): HTMLElement {
        return this.container;
    }
}
