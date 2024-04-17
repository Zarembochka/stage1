import { controller } from "../../../../../..";
import { BaseComponent } from "../../../../../../utils/baseComponents";
import { socket } from "../../../../../../websocket/websocket";

export class MessageForm extends BaseComponent {
    private message: HTMLInputElement;

    private btnSend: HTMLButtonElement;

    private user: string;

    private idEditMessage: string | null;

    constructor() {
        super({ tag: "form", classNames: ["message__form"] });
        this.message = this.createFormInputElement(["message__form__input"]);
        this.btnSend = this.createFormSubmitElement();
        this.user = "";
        this.idEditMessage = null;
        this.prepareForm();
    }

    private createFormSubmitElement(): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-action", "btn-send"],
            text: "Send",
        }).getElement();
        btn.disabled = true;
        btn.addEventListener("click", (event) => this.sendMessage(event));
        return btn;
    }

    private createFormInputElement(classNames: string[]): HTMLInputElement {
        const input = new BaseComponent<HTMLInputElement>({
            tag: "input",
            classNames: classNames,
        }).getElement();
        input.placeholder = "...Message";
        input.required = true;
        input.disabled = true;
        input.addEventListener("keyup", () => this.checkMessageLength());
        return input;
    }

    private prepareForm(): void {
        this.getElement().append(this.message, this.btnSend);
        window.addEventListener("user-change", (event) => this.enableForm(event));
        window.addEventListener("edit-message", (event) => this.editMessage(event));
    }

    private enableForm(event: Event): void {
        if (event instanceof CustomEvent) {
            this.user = event.detail.user.login;
            this.message.disabled = false;
        }
    }

    private checkMessageLength(): void {
        if (this.message.value.trim()) {
            this.btnSend.disabled = false;
            return;
        }
        this.btnSend.disabled = true;
    }

    private sendMessage(event: Event): void {
        event.preventDefault();
        const currentUser = controller.getActiveUser();
        if (currentUser) {
            if (this.idEditMessage) {
                socket.sendRequestForMessageEdit(this.idEditMessage, this.message.value.trim());
            } else {
                socket.sendRequestForMessage(this.user, this.message.value.trim());
            }
            this.clearForm();
        }
    }

    private clearForm(): void {
        this.message.value = "";
        this.idEditMessage = null;
    }

    private editMessage(event: Event): void {
        if (event instanceof CustomEvent) {
            this.idEditMessage = event.detail.id;
            this.message.value = event.detail.text;
            this.message.disabled = false;
            this.btnSend.disabled = false;
        }
    }
}
