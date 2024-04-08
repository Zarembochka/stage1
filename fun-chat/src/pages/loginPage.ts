import { BaseComponent } from "../utils/baseComponents";
import { LoginForm } from "./forms/loginForm";

export class LoginPage {
    private container: HTMLElement;

    private loginForm: LoginForm;

    constructor() {
        this.container = new BaseComponent({ tag: "div", classNames: ["container", "container__login"] }).getElement();
        this.loginForm = new LoginForm();
        this.createPage();
    }

    private createPage() {
        this.container.append(this.loginForm.getElement());
    }

    public getPage(): HTMLElement {
        return this.container;
    }
}
