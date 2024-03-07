import { Container } from "../container/container";
import { Header } from "../header/header";
import { MainLayout } from "./mainPage";

export class Main {
    private header: Header;

    private mainPage: MainLayout;

    private wrapper: Container;

    constructor() {
        this.wrapper = new Container("mainPage");
        this.header = new Header();
        this.mainPage = new MainLayout();
    }

    public startPage(): void {
        this.wrapper.createContainer();
        this.header.createHeader(this.wrapper);
        this.mainPage.createMain(this.wrapper);
    }

    public destroyPage(): void {
        this.header.destroyHeader();
        this.mainPage.destroyMainPage();
    }
}
