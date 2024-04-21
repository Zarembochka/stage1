import { aboutLogo } from "../../abstracts/logos";
import { router } from "../../router/router";
import { BaseComponent } from "../../utils/baseComponents";
import { LoginForm } from "./forms/loginForm";

export class LoginPage {
    private container: HTMLElement;

    private loginForm: LoginForm;

    private btnAbout: HTMLButtonElement;

    private wrapper: HTMLElement;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__login"] }).getElement();
        this.wrapper = new BaseComponent({ tag: "div", classNames: ["login"] }).getElement();
        this.loginForm = new LoginForm();
        this.btnAbout = this.createBtnAbout();
        this.createPage();
    }

    private createPage() {
        this.wrapper.append(this.btnAbout, this.loginForm.getElement());
        this.container.append(this.wrapper);
    }

    private createBtnAbout(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-login-about"],
        }).getElement();
        btn.innerHTML = aboutLogo;
        btn.title = "About app";
        btn.addEventListener("click", () => this.goToPageAbout());
        return btn;
    }

    public getPage(): HTMLElement {
        return this.container;
    }

    public clearLoginForm(): void {
        this.loginForm.clearForm();
    }

    private goToPageAbout(): void {
        router.about();
    }
}
