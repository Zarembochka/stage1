import { ActiveUser, AllUsersRequest, LoginLogoutRequest, MessageRequest, TypesMessages } from "../utils/interfaces";

export class Message {
    public getRequestForLogin(id: number, login: string, password: string): LoginLogoutRequest {
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

    public getRequestForLogout(id: number, user: ActiveUser): LoginLogoutRequest {
        const msg = {
            id: String(id),
            type: TypesMessages.logout,
            payload: {
                user: {
                    login: user.login,
                    password: user.password,
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

    public getRequestForMessageToUser(id: number, login: string, text: string): MessageRequest {
        const msg = {
            id: String(id),
            type: TypesMessages.msgSend,
            payload: {
                message: {
                    to: login,
                    text: text,
                },
            },
        };
        return msg;
    }
}
