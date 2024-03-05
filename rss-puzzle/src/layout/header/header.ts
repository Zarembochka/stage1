import { Layout } from "../../abstract/classes";
import { container } from "../container/container";
import { main } from "../main/main";
import { lStorage } from "../modalWindow/localStorage";
import { modalWindow } from "../modalWindow/modal";

class Header extends Layout {
    private header;
    constructor() {
        super();
        this.header = this.createElement("header", "header");
    }
    public createHeader(): void {
        this.createTitle();
        this.createBtnLogout();
        container.appendElement(this.header);
        this.header.classList.add("fade-in");
    }
    private createBtnLogout(): void {
        const btn = this.createElement("button", "btn btn-submit btn-logout", "Logout");
        btn.addEventListener("click", logout);
        this.header.append(btn);
    }
    private createTitle(): void {
        const title = this.createElement("h2", "header__title", lStorage.getGreeting());
        this.header.append(title);
    }
    public removeHeader(): void {
        this.header.innerHTML = "";
    }
}

function logout() {
    lStorage.removeUserFromLS();
    header.removeHeader();
    main.removeMain();
    modalWindow.showModal();
}

export const header = new Header();
