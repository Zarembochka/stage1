import { Layout } from "../../abstract/classes";
import { checkValidation, focusValidation, checkValidationBeforeSaving } from "./validation";
import { Container } from "../container/container";
import { app } from "../..";

export class LoginPage extends Layout {
    private main;

    private wrapper;

    constructor() {
        super();
        this.wrapper = new Container("startPage");
        this.main = this.createElement("main", "start");
    }

    public createMain(): void {
        this.wrapper.createContainer();
        this.wrapper.appendElement(this.main);
        this.prepareModalToLogin(this.main);
    }

    private prepareModalToLogin(element: Element): void {
        this.createFormLogin(element);
    }

    private addHeaderToLogin(title: string, element: Element) {
        const modalTitle = this.createElement("h3", "modal__title", title);
        element.append(modalTitle);
    }

    private createFormLogin(element: Element): void {
        const form = this.createElement("form", "modal__login");
        this.createFormItem(form, "First Name", "login_firstName");
        this.createFormItem(form, "Surname", "login_surname");
        this.createButtonSubmit(form);
        element.append(form);
    }

    private createFormItem(element: Element, title: string, id: string): void {
        const formItem = this.createElement("div", "modal__login__item");
        this.createLabel(formItem, title, id);
        this.createInput(formItem, title, id);
        this.createMessage(formItem);
        element.append(formItem);
    }

    private createLabel(element: Element, title: string, id: string): void {
        const label = this.createElement("label", "modal__login__item-label", title);
        label.setAttribute("for", id);
        element.append(label);
    }

    private createInput(element: Element, title: string, id: string): void {
        const input = this.createElement("input", "modal__login__item-input");
        input.id = id;
        input.setAttribute("required", "true");
        input.setAttribute("type", "text");
        input.addEventListener("focusout", checkValidation);
        input.addEventListener("focusin", focusValidation);
        element.append(input);
    }

    private createMessage(element: Element): void {
        const message = this.createElement("span", "modal__login__item-message");
        element.append(message);
    }

    private createButtonSubmit(element: Element): void {
        const btn = this.createElement("button", "btn btn-submit", "Login");
        btn.addEventListener("click", (event) => this.login(event));
        element.append(btn);
    }

    // private clearModal(): void {
    //     const inputs = [...document.querySelectorAll<HTMLInputElement>(".modal__login__item-input")];
    //     for (let i = 0; i < inputs.length; i += 1) {
    //         inputs[i].value = "";
    //         inputs[i].classList.remove("modal__login__item-valid");
    //     }
    // }

    private login(event: Event): void {
        event.preventDefault();
        if (checkValidationBeforeSaving()) {
            app.localStorage.saveUserToLS();
            this.destroyLoginPage();
            app.mainPage.startPage();
        }
    }

    private destroyLoginPage(): void {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        while (this.main.firstChild) {
            this.main.removeChild(this.main.firstChild);
        }
    }
}
