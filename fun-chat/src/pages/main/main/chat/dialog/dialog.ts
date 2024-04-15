import { controller } from "../../../../..";
import { BaseComponent } from "../../../../../utils/baseComponents";
import { Message, UserResponse } from "../../../../../utils/interfaces";
import { socket } from "../../../../../websocket/websocket";
import { MessageElement } from "./message/message";

export class ChatDialog extends BaseComponent {
    private user: UserResponse | null;

    private startMessage: HTMLElement;

    constructor() {
        super({ tag: "main", classNames: ["chat__dialog"] });
        this.user = null;
        this.startMessage = new BaseComponent({
            tag: "div",
            classNames: ["chat__startDialog"],
            text: "Send your first message!",
        }).getElement();
        this.prepareMain();
    }

    private prepareMain(): void {
        this.showStartMessage();
        window.addEventListener("user-change", (event) => this.updateUser(event));
        window.addEventListener("history-dialog", (event) => this.showDialog(event));
        window.addEventListener("logout", () => this.logout());
    }

    private updateUser(event: Event): void {
        this.removeOldMessades();
        if (event instanceof CustomEvent) {
            const info = event.detail.user;
            this.user = info;
            this.showStartMessage();
        }
    }

    private showDialog(event: Event): void {
        if (this.user) {
            if (event instanceof CustomEvent) {
                this.removeOldMessades();
                const messages: Message[] = event.detail.messages;
                if (messages.length) {
                    this.showHistoryMessage(messages);
                }
            }
        }
    }

    private showStartMessage(): void {
        this.getElement().append(this.startMessage);
    }

    private showHistoryMessage(msg: Message[]): void {
        msg.forEach((item) => {
            const message = new MessageElement(item.id, item.datetime, item.text).getElement();
            if (item.from === controller.getActiveUser()?.login) {
                message.classList.add("author");
            }
            this.appendElement(message);
            if (!item.status.isReaded && item.to === controller.getActiveUser()?.login) {
                socket.sentRequestForStatusRead(item.id);
            }
        });
        if (this.user) {
            controller.allMessagesRead(this.user.login);
        }
    }

    private removeOldMessades(): void {
        while (this.getElement().firstElementChild) {
            this.getElement().firstElementChild?.remove();
        }
    }

    private logout(): void {
        this.user = null;
        this.removeOldMessades();
        this.showStartMessage();
    }
}
