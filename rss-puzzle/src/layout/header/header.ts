import { Layout } from "../../abstract/classes";
import { container } from "../container/container";
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
    }
    private createBtnLogout(): void {
        const btn = this.createElement("button", "btn btn-submit btn-logout", "Logout");
        btn.addEventListener("click", logout);
        this.header.append(btn);
    }
    private createTitle(): void {
        const title = this.createElement("h1", "header__title", "RSS puzzle");
        this.header.append(title);
    }
    public removeHeader(): void {
        this.header.innerHTML = "";
    }
}

function logout() {
    lStorage.removeUserFromLS();
    header.removeHeader();
    modalWindow.showModal();
}

export const header = new Header();
