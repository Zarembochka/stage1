import { controller } from "../../../../..";
import { BaseComponent } from "../../../../../utils/baseComponents";
import { Message, UserResponse } from "../../../../../utils/interfaces";
import { socket } from "../../../../../websocket/websocket";
import { MessageElement } from "./message/message";

export class ChatDialog extends BaseComponent {
    private user: UserResponse | null;

    private startMessage: HTMLElement;

    private separateLine: HTMLElement;

    private unreadMessages: Message[];

    private allMessages: MessageElement[];

    constructor() {
        super({ tag: "main", classNames: ["chat__dialog"] });
        this.user = null;
        this.startMessage = new BaseComponent({
            tag: "div",
            classNames: ["chat__startDialog"],
            text: "Select user to start chat!",
        }).getElement();
        this.separateLine = new BaseComponent({
            tag: "div",
            classNames: ["chat__separateLine"],
            text: "Unread messages",
        }).getElement();
        this.unreadMessages = [];
        this.allMessages = [];
        this.prepareMain();
    }

    private prepareMain(): void {
        this.showStartMessage();
        window.addEventListener("user-change", (event) => this.updateUser(event));
        window.addEventListener("history-dialog", (event) => this.showDialog(event));
        window.addEventListener("new-message", (event) => this.showNewMessage(event));
        window.addEventListener("logout", () => this.logout());
        window.addEventListener("delete-message", (event) => this.removeMessageFromChat(event));
        //this.getElement().addEventListener("scrollend", this.startListenToReadMessagesScroll.bind(this));
    }

    private startListenToReadMessages(): void {
        //this.getElement().addEventListener("scrollend", this.startListenToReadMessagesScroll.bind(this), false);
        //this.getElement().addEventListener("scroll", this.readAllMessages.bind(this));
        this.startListenToReadMessagesClick();
    }

    private startListenToReadMessagesScroll(): void {
        this.getElement().addEventListener("scroll", this.readAllMessages.bind(this), false);
    }

    private startListenToReadMessagesClick(): void {
        this.getElement().addEventListener("click", this.readAllMessages.bind(this), false);
    }

    public readAllMessages(): void {
        this.removeSeparateLine();
        if (this.user) {
            controller.allMessagesRead(this.user.login);
        }
        this.changeStatusForRead();
        this.stopListenToReadMessages();
    }

    private stopListenToReadMessages(): void {
        this.getElement().removeEventListener("scrollend", this.startListenToReadMessagesScroll.bind(this), false);
        this.getElement().removeEventListener("scroll", this.readAllMessages, false);
        this.getElement().removeEventListener("click", this.readAllMessages, false);
    }

    private removeSeparateLine(): void {
        this.separateLine.remove();
    }

    private updateUser(event: Event): void {
        this.removeOldMessades();
        if (event instanceof CustomEvent) {
            const info = event.detail.user;
            this.user = info;
            this.startMessage.textContent = "Send your first message!";
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
        const msgOld = msg.filter((item) => item.status.isReaded || item.from === controller.getActiveUser()?.login);
        const msgNew = msg.filter((item) => !item.status.isReaded && item.from !== controller.getActiveUser()?.login);
        this.showDialogWithUser(msgOld);
        if (msgNew.length) {
            this.appendElement(this.separateLine);
            this.showDialogWithUser(msgNew);
            this.scrollToUnreadMessages();
            this.startListenToReadMessages();
        }
        //this.scrollToLastMessage();
        // if (this.user) {
        //     controller.allMessagesRead(this.user.login);
        // }
    }

    private showDialogWithUser(msg: Message[]): void {
        msg.forEach((item) => {
            const newMsg = new MessageElement(item.id, item.from, item.datetime, item.text);
            this.allMessages.push(newMsg);
            const message = newMsg.getElement();
            if (item.from === controller.getActiveUser()?.login) {
                message.classList.add("author");
            }
            this.appendElement(message);
            if (!item.status.isReaded && item.to === controller.getActiveUser()?.login) {
                this.unreadMessages.push(item);
                //socket.sentRequestForStatusRead(item.id);
            }
        });
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

    private scrollToLastMessage(message: HTMLElement): void {
        if (this.isUnreadMessages()) {
            this.scrollToUnreadMessages();
            return;
        }
        message.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
    }

    private scrollToUnreadMessages(): void {
        this.separateLine.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
    }

    private showNewMessage(event: Event): void {
        if (this.user) {
            if (event instanceof CustomEvent) {
                if (this.user.login === event.detail.from || event.detail.from === controller.getActiveUser()?.login) {
                    this.removeStartMessage();
                    const newMsg = new MessageElement(
                        event.detail.id,
                        event.detail.from,
                        event.detail.datetime,
                        event.detail.text
                    );
                    this.allMessages.push(newMsg);
                    const message = newMsg.getElement();
                    if (event.detail.from === controller.getActiveUser()?.login) {
                        message.classList.add("author");
                        this.readAllMessages();
                    }
                    if (!this.isUnreadMessages() && event.detail.from !== controller.getActiveUser()?.login) {
                        this.appendElement(this.separateLine);
                    }
                    if (!event.detail.status.isReaded && this.user.login === event.detail.from) {
                        this.unreadMessages.push(event.detail);
                    }
                    this.appendElement(message);
                    this.scrollToLastMessage(message);
                }
            }
        }
    }

    private removeStartMessage(): void {
        this.startMessage.remove();
    }

    private changeStatusForRead(): void {
        this.unreadMessages.forEach((item) => socket.sentRequestForStatusRead(item.id));
        this.unreadMessages.length = 0;
    }

    private isUnreadMessages(): boolean {
        const line = this.getElement().querySelector(".chat__separateLine");
        if (line) {
            return true;
        }
        return false;
    }

    private removeMessageFromChat(event: Event): void {
        if (event instanceof CustomEvent) {
            const id = event.detail.id;
            this.removeMessage(id);
        }
    }

    private removeMessage(id: string): void {
        const msg = this.findMesssage(id);
        if (msg) {
            msg.removeElement();
            this.removeMessageFromUnread(id);
            if (!this.allMessages.length) {
                this.showStartMessage();
            }
        }
    }

    private findMesssage(id: string): MessageElement | undefined {
        const itemIndex = this.allMessages.findIndex((msg) => msg.id === id);
        if (itemIndex !== -1) {
            const item = this.allMessages[itemIndex];
            for (let i = itemIndex; i < this.allMessages.length - 1; i += 1) {
                this.allMessages[i] = this.allMessages[i + 1];
            }
            this.allMessages.pop();
            return item;
        }
        return undefined;
    }

    private removeMessageFromUnread(id: string): void {
        const item = this.unreadMessages.findIndex((msg) => msg.id === id);
        if (item !== -1) {
            for (let i = item; i < this.unreadMessages.length - 1; i += 1) {
                this.unreadMessages[i] = this.unreadMessages[i + 1];
            }
            this.unreadMessages.pop();
            if (!this.unreadMessages.length) {
                this.removeSeparateLine();
            }
        }
    }
}
