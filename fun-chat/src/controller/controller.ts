import {
    ActiveUser,
    HistoryResponse,
    MessageDeleteResponse,
    MessageResponse,
    UserResponse,
    UnreadMessage,
    MessageEditResponse,
} from "../utils/interfaces";
import { socket } from "../websocket/websocket";

export class Controller {
    private activeUser: ActiveUser | null;

    private unreadMessages: UnreadMessage[];

    constructor() {
        this.activeUser = null;
        this.unreadMessages = [];
    }

    public selectUser(user: UserResponse): void {
        const userChange = new CustomEvent("user-change", { detail: { user: user } });
        window.dispatchEvent(userChange);
    }

    public updateStatusUser(user: UserResponse): void {
        const userChangeStatus = new CustomEvent("user-change-status", { detail: { user: user } });
        window.dispatchEvent(userChangeStatus);
    }

    public showNewMessage(data: MessageResponse): void {
        const newMessage = new CustomEvent("new-message", {
            detail: {
                id: data.payload.message.id,
                from: data.payload.message.from,
                to: data.payload.message.to,
                text: data.payload.message.text,
                datetime: data.payload.message.datetime,
                status: {
                    isDelivered: data.payload.message.status.isDelivered,
                    isReaded: data.payload.message.status.isReaded,
                    isEdited: data.payload.message.status.isEdited,
                },
            },
        });
        this.unreadMessages.push({ login: data.payload.message.from, id: data.payload.message.id });
        window.dispatchEvent(newMessage);
    }

    public showUnreadMessages(data: HistoryResponse): void {
        if (this.activeUser) {
            const msgs = data.payload.messages.filter((users) => users.to === this.activeUser?.login);
            const msgUnread = msgs.filter((item) => !item.status.isReaded);
            const msgsCount = msgUnread.length;
            if (msgsCount > 0) {
                const unreadMessages = new CustomEvent("unread-messages", {
                    detail: { from: msgs[0].from, count: msgsCount },
                });
                window.dispatchEvent(unreadMessages);
            }
            msgUnread.forEach((item) => {
                this.unreadMessages.push({ login: item.to, id: item.id });
            });
        }
    }

    public showDialogHistory(data: HistoryResponse): void {
        if (this.activeUser) {
            const msgs = data.payload.messages.filter(
                (users) => users.to === this.activeUser?.login || users.from === this.activeUser?.login
            );
            if (msgs.length) {
                const historyDialog = new CustomEvent("history-dialog", {
                    detail: { from: msgs[0].from, messages: msgs },
                });
                window.dispatchEvent(historyDialog);
            }
        }
    }

    public allMessagesRead(from: string): void {
        const unreadMessages = new CustomEvent("unread-messages", {
            detail: { from: from, count: 0 },
        });
        window.dispatchEvent(unreadMessages);
        this.removeUnreadMessagesFromUser(from);
    }

    private removeUnreadMessagesFromUser(from: string): void {
        const msgs = this.unreadMessages.filter((item) => item.login !== from);
        this.unreadMessages = [...msgs];
    }

    public setCurrentUser(login: string, password: string): void {
        this.activeUser = {
            login: login,
            password: password,
            isLogined: false,
        };
    }

    public setActiveUser(): void {
        if (this.activeUser) {
            this.activeUser.isLogined = true;
        }
    }

    public getActiveUser(): ActiveUser | null {
        return this.activeUser;
    }

    public logout(): void {
        if (this.activeUser) {
            socket.sendRequestForUserLogout(this.activeUser);
            this.activeUser = null;
            const logout = new CustomEvent("logout", {
                detail: {},
            });
            window.dispatchEvent(logout);
        }
    }

    public deleteMessage(data: MessageDeleteResponse): void {
        if (!data.payload.message.status.isDeleted) {
            return;
        }
        const deteleMessage = new CustomEvent("delete-message", {
            detail: { id: data.payload.message.id },
        });
        window.dispatchEvent(deteleMessage);
        this.checkUnreadMessage(data.payload.message.id);
    }

    public updateUnreadMessages(login: string, count: number): void {
        const unreadMessages = new CustomEvent("unread-messages", {
            detail: { from: login, count: count },
        });
        window.dispatchEvent(unreadMessages);
    }

    private checkUnreadMessage(id: string): void {
        const msg = this.unreadMessages.find((item) => item.id === id);
        if (msg) {
            const count = this.unreadMessages.filter((item) => item.login === msg.login && item.id !== id).length;
            this.updateUnreadMessages(msg.login, count);
            const newUnread = this.unreadMessages.filter((item) => item.id !== id);
            this.unreadMessages = [...newUnread];
        }
    }

    public editMessage(id: string, text: string): void {
        const ediMsg = new CustomEvent("edit-message", {
            detail: { id: id, text: text },
        });
        window.dispatchEvent(ediMsg);
    }

    public editMessageInChat(data: MessageEditResponse): void {
        if (!data.payload.message.status.isEdited) {
            return;
        }
        const ediMsg = new CustomEvent("edited-message", {
            detail: { id: data.payload.message.id, text: data.payload.message.text },
        });
        window.dispatchEvent(ediMsg);
    }
}
