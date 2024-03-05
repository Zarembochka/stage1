import { Layout } from "../../abstract/classes";
import { lStorage } from "./localStorage";
import { checkValidation, focusValidation } from "./validation";

class Modal extends Layout {
    createModal(): void {
        const modalBackground = this.createElement("div", "modal__background");
        const modal = this.createElement("div", "modal");
        this.prepareModalToLogin(modal);
        modalBackground.append(modal);
        document.body.append(modalBackground);
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
        btn.addEventListener("click", login);
        element.append(btn);
    }
}

export const modalWindow = new Modal();

function login(event: Event) {
    event.preventDefault();
    lStorage.saveUserToLS();
}
