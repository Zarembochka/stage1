import { controller } from "../../../../../..";
import { deleteLogo, editLogo, statusLogo } from "../../../../../../abstracts/logos";
import { BaseComponent } from "../../../../../../utils/baseComponents";
import { MessageStatus } from "../../../../../../utils/interfaces";
import { socket } from "../../../../../../websocket/websocket";

export class MessageElement extends BaseComponent {
    private header: HTMLElement;

    private body: HTMLElement;

    private footer: HTMLElement;

    private time: HTMLElement;

    private status: HTMLElement;

    public id: string;

    private btnDelete: HTMLButtonElement;

    private btnEdit: HTMLButtonElement;

    private content: HTMLElement;

    private statusEdited: HTMLElement;

    constructor(id: string, login: string, datetime: number, content: string, options: MessageStatus) {
        super({ tag: "div", classNames: ["message"] });
        this.id = id;
        this.header = this.createHTMLElement("message__header", login);
        this.body = this.createHTMLElement("message__body");
        this.content = this.createHTMLElement("message__body__content", content);
        this.btnDelete = this.createBtnElement("btn-delete", deleteLogo, "delete");
        this.btnEdit = this.createBtnElement("btn-edit", editLogo, "edit");
        this.footer = this.createHTMLElement("message__footer");
        this.time = this.createHTMLElement("message__footer__time", this.getDate(datetime));
        this.status = this.createHTMLElement("message__footer__status");
        this.statusEdited = this.createHTMLElement("message__footer__statusEdited");
        if (options.isEdited) {
            this.changeStatusToEdited();
        }
        this.status.innerHTML = statusLogo;
        this.prepareMessage();
    }

    private prepareMessage(): void {
        this.btnDelete.addEventListener("click", () => this.deleteMessage());
        this.btnEdit.addEventListener("click", () => this.editMessage());
        this.body.append(this.btnDelete, this.btnEdit, this.content);
        this.footer.append(this.time, this.statusEdited, this.status);
        this.getElement().append(this.header, this.body, this.footer);
    }

    private getDate(datetime: number): string {
        const dataMessage = new Date(datetime);
        const month = String(dataMessage.getMonth() + 1).padStart(2, "0");
        const hours = String(dataMessage.getHours()).padStart(2, "0");
        const minutes = String(dataMessage.getMinutes()).padStart(2, "0");
        const result = `${dataMessage.getDate()}/${month}/${dataMessage.getFullYear()}  ${hours}.${minutes}`;
        return result;
    }

    private createHTMLElement(classname: string, text?: string): HTMLElement {
        const item = new BaseComponent({
            tag: "div",
            classNames: [classname],
            text: text,
        }).getElement();
        return item;
    }

    private createBtnElement(name: string, logo: string, title: string): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-message", name],
        }).getElement();
        btn.innerHTML = logo;
        btn.title = `${title} message`;
        //btn.addEventListener("click", (event) => this.sendMessage(event));
        return btn;
    }

    private deleteMessage(): void {
        socket.sendRequestForMessageDelete(this.id);
    }

    private editMessage(): void {
        if (!this.content.textContent) {
            return;
        }
        controller.editMessage(this.id, this.content.textContent);
    }

    public editTextMessage(text: string): void {
        this.content.textContent = text;
        this.changeStatusToEdited();
    }

    private changeStatusToEdited(): void {
        this.statusEdited.innerHTML = editLogo;
    }
}
