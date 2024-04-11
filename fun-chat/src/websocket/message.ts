import { AllUsersRequest, LoginRequest, TypesMessages } from "../utils/interfaces";

export class Message {
    public getRequestForLogin(id: number, login: string, password: string): LoginRequest {
        const msg = {
            id: String(id),
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

    public getRequestForOnlineUsers(id: number): AllUsersRequest {
        const msg = {
            id: String(id),
            type: TypesMessages.usersActive,
            payload: null,
        };
        return msg;
    }

    public getRequestForOfflineUsers(id: number): AllUsersRequest {
        const msg = {
            id: String(id),
            type: TypesMessages.usersNonActive,
            payload: null,
        };
        return msg;
    }
}
