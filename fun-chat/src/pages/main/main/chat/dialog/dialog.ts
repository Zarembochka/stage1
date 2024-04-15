import { controller } from "../../../../..";
import { BaseComponent } from "../../../../../utils/baseComponents";
import { Message, UserResponse } from "../../../../../utils/interfaces";
import { socket } from "../../../../../websocket/websocket";
import { MessageElement } from "./message/message";

export class ChatDialog extends BaseComponent {
    private user: UserResponse | null;

    constructor() {
        super({ tag: "main", classNames: ["chat__dialog"] });
        this.user = null;
        this.prepareMain();
    }

    private prepareMain(): void {
        window.addEventListener("user-change", (event) => this.updateUser(event));
        window.addEventListener("history-dialog", (event) => this.showDialog(event));
    }

    private updateUser(event: Event): void {
        if (event instanceof CustomEvent) {
            const info = event.detail.user;
            this.user = info;
        }
    }

    private showDialog(event: Event): void {
        if (this.user) {
            if (event instanceof CustomEvent) {
                this.removeOldMessades();
                const messages: Message[] = event.detail.messages;
                messages.forEach((item) => {
                    const message = new MessageElement(item.id, item.datetime, item.text).getElement();
                    if (item.from === controller.getActiveUser()?.login) {
                        message.classList.add("author");
                    }
                    this.appendElement(message);
                    if (!item.status.isReaded && item.to === controller.getActiveUser()?.login) {
                        socket.sentRequestForStatusRead(item.id);
                    }
                });
                controller.allMessagesRead(this.user.login);
            }
        }
    }

    // private showHistoryMessage(msg: Message[]): void {
    //     msg.forEach((item) => {
    //         const message = new MessageElement(item.id, item.datetime, item.text).getElement();
    //         this.appendElement(message);
    //         socket.sentRequestForStatusRead(item.id);
    //     });
    // }

    private removeOldMessades(): void {
        while (this.getElement().firstElementChild) {
            this.getElement().firstElementChild?.remove();
        }
    }
}
