import { BaseComponent } from "../../utils/baseComponents";
import { StatusUser, UserResponse } from "../../utils/interfaces";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { MainPart } from "./main/mainPart";

export class MainPage {
    private container: HTMLElement;

    private header: Header;

    private main: MainPart;

    private footer: Footer;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__main"] }).getElement();
        this.header = new Header();
        this.main = new MainPart();
        this.footer = new Footer();
        this.createPage();
    }

    private createPage() {
        this.container.append(this.header.getElement(), this.main.getElement(), this.footer.getElement());
    }

    public getPage(): HTMLElement {
        return this.container;
    }

    public setActiveUser(): void {
        this.header.setUserName();
    }

    public updateUsers(users: UserResponse[], status: StatusUser): void {
        this.main.updateUsers(users, status);
    }

    public removeUsers(): void {
        this.main.removeUsers();
    }
}
