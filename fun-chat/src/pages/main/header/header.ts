import { BaseComponent } from "../../../utils/baseComponents";

export class Header extends BaseComponent {
    private title: HTMLElement;

    private btnLogout: HTMLButtonElement;

    constructor() {
        super({ tag: "header", classNames: ["header"] });
        this.title = this.createTitle();
        this.btnLogout = this.createBtnLogout();
        this.prepareHeader();
    }

    private prepareHeader(): void {
        this.getElement().append(this.title, this.btnLogout);
    }

    private createTitle(): HTMLElement {
        const title = new BaseComponent({ tag: "h1", classNames: ["header__title"], text: "Fun-chat" }).getElement();
        return title;
    }

    private createBtnLogout(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-logout"],
            text: "Logout",
        });
        return btn.getElement();
    }

    public setUserName(name: string): void {
        this.title.textContent = `Fun-chat: ${name}`;
    }
}
