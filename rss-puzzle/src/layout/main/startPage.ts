import { Container } from "../container/container";
import { Header } from "../header/header";
import { MainLayout } from "./mainPage";

export class Main {
    private header: Header;

    public gamePage: MainLayout;

    private wrapper: Container;

    constructor() {
        this.wrapper = new Container("mainPage");
        this.header = new Header();
        this.gamePage = new MainLayout();
    }

    public startPage(): void {
        this.wrapper.createContainer();
        this.header.createHeader(this.wrapper);
        this.gamePage.createMain(this.wrapper);
    }

    public destroyPage(): void {
        this.header.destroyHeader();
        this.gamePage.destroyMainPage();
    }
}
