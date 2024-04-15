import { BaseComponent } from "../../../utils/baseComponents";
import { socket } from "../../../websocket/websocket";
import { checkValidationBeforeSaving, checkValidation, focusValidation } from "./validation";
//import { router } from "../../../router/router";
import { controller } from "../../..";
//import { PagesView } from "../../../utils/interfaces";

export class LoginForm extends BaseComponent {
    private user: HTMLInputElement;

    private password: HTMLInputElement;

    private btnLogin: HTMLButtonElement;

    constructor() {
        super({ tag: "form", classNames: ["login__form"] });
        this.user = this.createFormInputElement(["login__form__input"], "login_login", "text");
        this.password = this.createFormInputElement(
            ["login__form__input", "login__form__input-password"],
            "login_password",
            "password"
        );
        this.btnLogin = this.createFormSubmitElement();
        this.prepareForm();
    }

    private createFormSubmitElement(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-login"],
            text: "Login",
        }).getElement();
        btn.addEventListener("click", (event) => this.login(event));
        return btn;
    }

    private createFormInputElement(classNames: string[], id: string, type: "text" | "password"): HTMLInputElement {
        const input = new BaseComponent<HTMLInputElement>({
            tag: "input",
            classNames: classNames,
        }).getElement();
        input.id = id;
        input.required = true;
        input.type = type;
        input.addEventListener("focusin", () => focusValidation(input));
        input.addEventListener("focusout", () => checkValidation(input));
        return input;
    }

    private prepareForm(): void {
        const userItem = this.createFormItem("Login", this.user, "login_login");
        const passwordItem = this.createFormItem("Password", this.password, "login_password");
        this.getElement().append(userItem, passwordItem, this.btnLogin);
    }

    private createFormItem(title: string, element: HTMLElement, id: string): HTMLElement {
        const formItem = this.createFormItemWrapper();
        const label = this.createFormLabel(title, id);
        const message = this.createFormMessage();
        formItem.append(label, element, message);
        return formItem;
    }

    private createFormItemWrapper(): HTMLElement {
        const formItem = new BaseComponent({ tag: "div", classNames: ["login__form__item"] });
        return formItem.getElement();
    }

    private createFormLabel(title: string, id: string): HTMLElement {
        const label = new BaseComponent({
            tag: "label",
            classNames: ["login__form__item__label"],
            text: title,
        }).getElement();
        label.setAttribute("for", id);
        return label;
    }

    private createFormMessage(): HTMLElement {
        const message = new BaseComponent({ tag: "span", classNames: ["login__form__item__message"] });
        return message.getElement();
    }

    private login(event: Event): void {
        event.preventDefault();
        if (checkValidationBeforeSaving([this.user, this.password])) {
            //TODO add actions after success validation
            //router.main();
            //app.mainPage.saveCurrentUser(this.user.value.trim(), this.password.value.trim());
            controller.setCurrentUser(this.user.value.trim(), this.password.value.trim());
            socket.sendRequestForUserLogin(this.user.value.trim(), this.password.value.trim());
            //this.clearForm();
        }
    }

    public clearForm(): void {
        this.user.value = "";
        this.password.value = "";
        this.user.classList.remove("form__login__item-valid");
        this.password.classList.remove("form__login__item-valid");
    }
}
