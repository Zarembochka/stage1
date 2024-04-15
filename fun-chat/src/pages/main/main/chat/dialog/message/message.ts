import { BaseComponent } from "../../../../../../utils/baseComponents";

export class MessageElement extends BaseComponent {
    private header: HTMLElement;

    private body: HTMLElement;

    private footer: HTMLElement;

    private id: string;

    constructor(id: string, datetime: number, content: string) {
        super({ tag: "div", classNames: ["chat__dialog__message"] });
        this.id = id;
        this.header = new BaseComponent({
            tag: "div",
            classNames: ["chat__dialog__message__header"],
            text: this.getDate(datetime),
        }).getElement();
        this.body = new BaseComponent({
            tag: "div",
            classNames: ["chat__dialog__message__body"],
            text: content,
        }).getElement();
        this.footer = new BaseComponent({ tag: "div", classNames: ["chat__dialog__message__footer"] }).getElement();
        this.prepareMessage();
    }

    private prepareMessage(): void {
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
}
