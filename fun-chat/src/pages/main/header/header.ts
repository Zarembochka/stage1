import { controller } from "../../..";
import { aboutLogo } from "../../../abstracts/logos";
import { router } from "../../../router/router";
import { sStorage } from "../../../sessionStorage/storage";
import { BaseComponent } from "../../../utils/baseComponents";

export class Header extends BaseComponent {
    private title: HTMLElement;

    private btnLogout: HTMLButtonElement;

    private btnAbout: HTMLButtonElement;

    constructor() {
        super({ tag: "header", classNames: ["header"] });
        this.title = this.createTitle();
        this.btnLogout = this.createBtnLogout();
        this.btnAbout = this.createBtnAbout();
        this.prepareHeader();
    }

    private prepareHeader(): void {
        this.getElement().append(this.title, this.btnAbout, this.btnLogout);
    }

    private createTitle(): HTMLElement {
        const title = new BaseComponent({ tag: "h1", classNames: ["header__title"], text: "Fun-chat" }).getElement();
        return title;
    }

    private createBtnLogout(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-action", "btn-logout"],
            text: "Logout",
        }).getElement();
        btn.addEventListener("click", () => this.logout());
        return btn;
    }

    private createBtnAbout(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-about"],
        }).getElement();
        btn.innerHTML = aboutLogo;
        btn.title = "About app";
        //btn.addEventListener("click", () => this.logout());
        return btn;
    }

    public setUserName(): void {
        this.title.textContent = `Fun-chat: ${this.getUsername()}`;
    }

    private logout(): void {
        sStorage.removeUser();
        router.start();
        controller.logout();
    }

    private getUsername(): string {
        return controller.getActiveUser()?.login || "";
    }
}
