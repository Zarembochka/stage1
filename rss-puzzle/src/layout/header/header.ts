import { app } from "../..";
import { Layout } from "../../abstract/classes";
import { game } from "../../game/game";
import { modalWindow } from "../../game/modal";
import { Container } from "../container/container";

export class Header extends Layout {
    private header;

    constructor() {
        super();
        this.header = this.createElement("header", "header");
    }

    public createHeader(wrapper: Container): void {
        this.createTitle();
        this.createBtnLogout();
        wrapper.appendElement(this.header);
        this.header.classList.add("fade-in");
    }

    private createBtnLogout(): void {
        const btn = this.createElement("button", "btn btn-submit btn-logout", "Logout");
        btn.addEventListener("click", () => this.logout());
        this.header.append(btn);
    }

    private createTitle(): void {
        const title = this.createElement("h1", "header__title", "RSS Puzzle");
        this.header.append(title);
    }

    private logout(): void {
        game.showButtonAutoComplete();
        app.localStorage.removeUserFromLS();
        app.mainPage.destroyPage();
        this.destroyHeader();
        modalWindow.clearModal();
        app.loginPage.createMain();
    }

    public destroyHeader(): void {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    }
}
