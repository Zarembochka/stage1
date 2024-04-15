import { app, controller } from "..";
import { myModal } from "../modal/modal";
import { router } from "../router/router";
import { sStorage } from "../sessionStorage/storage";
import {
    ActiveUser,
    AllUsersRequest,
    AllUsersResponse,
    ErrorResponse,
    LoginLogoutRequest,
    LoginResponse,
    MessageRequest,
    MessageResponse,
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

    public openConnection(): void {}

    private addListeners(): void {
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
    }

    private readMessageFromServer(data: LoginResponse | MessageResponse): void {
        if (data.type === TypesMessages.externalLogin || data.type === TypesMessages.externalLogout) {
            this.readMessageLoginLogoutFromServer(data as LoginResponse);
            return;
        }
        if (data.type === TypesMessages.msgSend) {
            this.readMessageNewMessageFromServer(data as MessageResponse);
            return;
        }
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
        sStorage.saveUserToLS(data.payload.user);
        this.sendRequestsForAllUsers();
        router.main();
    }

    private readMessageAllUsers(data: AllUsersResponse, status: StatusUser): void {
        const users = data.payload.users;
        app.mainPage.updateUsers(users, status);
    }

    private sendMessage(msg: LoginLogoutRequest | AllUsersRequest | MessageRequest): void {
        this.socket.send(JSON.stringify(msg));
        this.requests.push({ id: msg.id, type: msg.type });
        this.id += 1;
    }

    private checkServerStatus(): boolean {
        if (this.socket.readyState === 3) {
            myModal.showModal("No connection with server!");
            return false;
        }
        return true;
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

    private sendRequestsForAllUsers(): void {
        this.sendRequestForOnlineUsers();
        this.sendRequestForOfflineUsers();
    }

    public senfRequestForMessage(user: string, text: string): void {
        if (this.checkServerStatus()) {
            const msg = this.message.getRequestForMessageToUser(this.id, user, text);
            this.sendMessage(msg);
        }
    }
}

export const socket = new MyWebSocket();
