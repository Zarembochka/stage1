import { Layout } from "../../abstract/classes";
import { Container } from "../container/container";
import { main } from "../main/mainPage";
import { lStorage } from "../startPage/localStorage";
import { loginPage } from "../startPage/loginPage";

export const container = new Container("mainPage");

class Header extends Layout {
    private header;

    constructor() {
        super();
        this.header = this.createElement("header", "header");
    }

    public createHeader(): void {
        container.createContainer();
        this.createTitle();
        this.createBtnLogout();
        container.appendElement(this.header);
        this.header.classList.add("fade-in");
    }

    private createBtnLogout(): void {
        const btn = this.createElement("button", "btn btn-submit btn-logout", "Logout");
        btn.addEventListener("click", () => this.logout(this));
        this.header.append(btn);
    }

    private createTitle(): void {
        //const title = this.createElement("h2", "header__title", lStorage.getGreeting());
        const title = this.createElement("h1", "header__title", "RSS Puzzle");
        this.header.append(title);
    }

    private logout(header: Header): void {
        lStorage.removeUserFromLS();
        main.destroy();
        header.destroy();
        loginPage.createMain();
    }

    private destroy(): void {
        while (this.header.firstChild) {
            this.header.removeChild(this.header.firstChild);
        }
    }
}

export const header = new Header();
