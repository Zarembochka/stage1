import { app, controller } from "..";
import { myModal } from "../modal/modal";
import { router } from "../router/router";
import { sStorage } from "../sessionStorage/storage";
import {
    ActiveUser,
    AllUsersRequest,
    AllUsersResponse,
    ErrorResponse,
    HistoryRequest,
    HistoryResponse,
    LoginLogoutRequest,
    LoginResponse,
    MessageDeleteResponse,
    MessageRequest,
    MessageResponse,
    MessageStatusRequest,
    StatusUser,
    TypesMessages,
    TypesRequests,
} from "../utils/interfaces";
import { Message } from "./message";

const url = "ws://localhost:4000";

class MyWebSocket {
    private id: number;

    private socket: WebSocket;

    private requests: TypesRequests[];

    private message: Message;

    constructor() {
        this.id = 1;
        this.socket = new WebSocket(url);
        this.requests = [];
        this.message = new Message();
        this.addListeners();
    }

    public openConnection(): void {
        this.socket = new WebSocket(url);
        this.addListeners();
        const user = controller.getActiveUser();
        if (user) {
            controller.logout();
            controller.setCurrentUser(user.login, user.password);
            this.sendRequestForUserLogin(user.login, user.password);
        }
    }

    private addListeners(): void {
        this.socket.onopen = () => myModal.hideModal();
        this.socket.onclose = () => {
            myModal.showModal("No connection with server!");
            this.openConnection();
        };
        this.socket.onmessage = (message: MessageEvent) => {
            this.readMessage(message);
        };
        this.socket.onerror = (event: Event) => {
            this.readError(event);
        };
    }

    private readError(event: Event): void {
        if (this.checkServerStatus()) {
            console.log(event);
        }
    }

    private readMessage(msg: MessageEvent): void {
        const data = JSON.parse(msg.data);
        if (data.id === null) {
            this.readMessageFromServer(data);
            return;
        }
        const msgType = this.requests.find((item) => item.id === data.id);
        if (!msgType) {
            return;
        }
        if (data.type === TypesMessages.error) {
            this.readErrorMessage(data);
            return;
        }
        if (msgType.type === TypesMessages.login) {
            this.readMessageLogin(data);
        }
        if (msgType.type === TypesMessages.usersActive) {
            this.readMessageAllUsers(data, StatusUser.active);
        }
        if (msgType.type === TypesMessages.usersNonActive) {
            this.readMessageAllUsers(data, StatusUser.nonactive);
        }
        if (msgType.type === TypesMessages.msgHistory) {
            this.readMessageHistory(data);
        }
        if (msgType.type === TypesMessages.msgSend) {
            this.readMessageFromUser(data);
        }
        if (msgType.type === TypesMessages.msgDelete) {
            this.readMessageDeleteMyMessage(data);
        }
    }

    private readMessageDeleteMyMessage(data: MessageDeleteResponse): void {
        controller.deleteMessage(data);
    }

    private readMessageFromUser(data: MessageResponse): void {
        controller.showNewMessage(data);
    }

    private readMessageHistory(data: HistoryResponse): void {
        controller.showUnreadMessages(data);
        controller.showDialogHistory(data);
    }

    private readMessageFromServer(data: LoginResponse | MessageResponse | MessageDeleteResponse): void {
        if (data.type === TypesMessages.externalLogin || data.type === TypesMessages.externalLogout) {
            this.readMessageLoginLogoutFromServer(data as LoginResponse);
            return;
        }
        if (data.type === TypesMessages.msgSend) {
            this.readMessageNewMessageFromServer(data as MessageResponse);
            return;
        }
        if (data.type === TypesMessages.msgDelete) {
            this.readMessageDeleteMessageFromServer(data as MessageDeleteResponse);
            return;
        }
    }

    private readMessageDeleteMessageFromServer(data: MessageDeleteResponse): void {
        controller.deleteMessage(data);
    }

    private readMessageLoginLogoutFromServer(data: LoginResponse): void {
        app.mainPage.removeUsers();
        this.sendRequestsForAllUsers();
        controller.updateStatusUser(data.payload.user);
    }

    private readMessageNewMessageFromServer(data: MessageResponse): void {
        controller.showNewMessage(data);
    }

    private readErrorMessage(data: ErrorResponse) {
        myModal.showModal(data.payload.error);
    }

    private readMessageLogin(data: LoginResponse): void {
        sStorage.saveUserToLS(data.payload.user, controller.getActiveUser()?.password);
        controller.setActiveUser();
        this.sendRequestsForAllUsers();
        router.main();
    }

    private readMessageAllUsers(data: AllUsersResponse, status: StatusUser): void {
        const users = data.payload.users;
        app.mainPage.updateUsers(users, status);
    }

    private sendMessage(
        msg: LoginLogoutRequest | AllUsersRequest | MessageRequest | HistoryRequest | MessageStatusRequest
    ): void {
        this.waitForSendMessage(() => this.socket.send(JSON.stringify(msg)));
        //this.socket.send(JSON.stringify(msg));
        this.requests.push({ id: msg.id, type: msg.type });
        this.id += 1;
    }

    public checkServerStatus(): boolean {
        if (this.socket.readyState === 0) {
            this.waitForConnect(() => myModal.showModal("Connecting to server!"));
            //myModal.showModal("Connecting to server!");
            //return false;
        }
        if (this.socket.readyState === 1) {
            return true;
        }
        if (this.socket.readyState === 3) {
            this.waitForConnect(() => myModal.showModal("No connection with server!"));
            //myModal.showModal("No connection with server!");
            //return false;
        }
        return true;
    }

    public waitForConnect(callback: () => void): void {
        setTimeout(() => {
            if (this.socket.readyState === 1) {
                myModal.hideModal();
            } else {
                this.waitForConnect(callback);
            }
        }, 5);
    }

    public waitForSendMessage(callback: () => void): void {
        setTimeout(() => {
            if (this.socket.readyState === 1) {
                myModal.hideModal();
                callback();
            } else {
                this.waitForSendMessage(callback);
            }
        }, 5);
    }

    public sendRequestForUserLogin(login: string, password: string): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForLogin(this.id, login, password);
            this.sendMessage(msg);
        }
    }

    public sendRequestForUserLogout(user: ActiveUser): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForLogout(this.id, user);
            this.sendMessage(msg);
        }
    }

    private sendRequestForOnlineUsers(): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForOnlineUsers(this.id);
            this.sendMessage(msg);
        }
    }

    private sendRequestForOfflineUsers(): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForOfflineUsers(this.id);
            this.sendMessage(msg);
        }
    }

    public sendRequestsForAllUsers(): void {
        this.sendRequestForOnlineUsers();
        this.sendRequestForOfflineUsers();
    }

    public sendRequestForMessage(user: string, text: string): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForMessageToUser(this.id, user, text);
            this.sendMessage(msg);
        }
    }

    public sendRequestForUnreadMessage(user: string): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForHistoryMessageFromUser(this.id, user);
            this.sendMessage(msg);
        }
    }

    public sentRequestForStatusRead(idMessage: string): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForStatusRead(this.id, idMessage);
            this.sendMessage(msg);
        }
    }

    public closeConnection(): void {
        this.socket.close();
    }

    public sendRequestForMessageDelete(idMessage: string): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForMessageDelete(this.id, idMessage);
            this.sendMessage(msg);
        }
    }
}

export const socket = new MyWebSocket();
