import { BaseComponent } from "../../utils/baseComponents";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

export class MainPage {
    private container: HTMLElement;

    private header: Header;

    private footer: Footer;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__main"] }).getElement();
        this.header = new Header();
        this.footer = new Footer();

        this.createPage();
    }

    private createPage() {
        this.container.append(this.header.getElement(), this.footer.getElement());
    }

    public getPage(): HTMLElement {
        return this.container;
    }
}
