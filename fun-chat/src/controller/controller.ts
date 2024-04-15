import { ActiveUser, HistoryResponse, MessageResponse, UserResponse } from "../utils/interfaces";
import { socket } from "../websocket/websocket";

export class Controller {
    private activeUser: ActiveUser | null;

    constructor() {
        this.activeUser = null;
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
            detail: { from: data.payload.message.from, to: data.payload.message.to, text: data.payload.message.text },
        });
        window.dispatchEvent(newMessage);
    }

    public showUnreadMessages(data: HistoryResponse): void {
        if (this.activeUser) {
            const msgs = data.payload.messages.filter((users) => users.to === this.activeUser?.login);
            const msgsCount = msgs.filter((item) => !item.status.isReaded).length;
            if (msgsCount > 0) {
                const unreadMessages = new CustomEvent("unread-messages", {
                    detail: { from: msgs[0].from, count: msgsCount },
                });
                window.dispatchEvent(unreadMessages);
            }
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
}
