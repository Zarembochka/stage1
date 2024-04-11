import { router } from "../router/router";
import { sStorage } from "../sessionStorage/storage";
import { LoginRequest, LoginResponse, TypesMessages, TypesRequests } from "../utils/interfaces";

const url = "ws://localhost:4000";

class MyWebSocket {
    private id: number;

    private socket: WebSocket;

    private requests: TypesRequests[];

    constructor() {
        this.id = 1;
        this.socket = new WebSocket(url);
        this.requests = [];
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
        console.log(event);
    }

    private readMessage(msg: MessageEvent): void {
        const data = JSON.parse(msg.data);
        const msgType = this.requests.find((item) => item.id === data.id);
        if (!msgType) {
            return;
        }
        if (msgType.type === TypesMessages.login) {
            this.readMessageLogin(data);
        }
    }

    private readMessageLogin(data: LoginResponse): void {
        try {
            sStorage.saveUserToLS(data.payload.user);
            router.main(data.payload.user.login);
        } catch {
            if (data.type === TypesMessages.error) {
                //TODO modal with error
            }
        }
    }

    private userLogin(msg: LoginRequest): void {
        this.socket.send(JSON.stringify(msg));
        this.requests.push({ id: msg.id, type: msg.type });
        this.id += 1;
    }

    public sendRequestForUserLogin(login: string, password: string): void {
        const msg = this.getRequestForLogin(login, password);
        this.userLogin(msg);
    }

    private getRequestForLogin(login: string, password: string): LoginRequest {
        const msg = {
            id: String(this.id),
            type: TypesMessages.login,
            payload: {
                user: {
                    login: login,
                    password: password,
                },
            },
        };
        return msg;
    }
}

export const socket = new MyWebSocket();
