export interface ParamsToComponent {
    tag: string;
    classNames: string[];
    text?: string;
}

export enum PagesView {
    login,
    main,
}

export interface Routing {
    path: string;
    view: PagesView;
}

export enum PathToPage {
    login = 0,
    main = 1,
}

export enum TypesMessages {
    login = "USER_LOGIN",
    logout = "USER_LOGOUT",
    usersActive = "USER_ACTIVE",
    usersNonActive = "USER_INACTIVE",
    msgSend = "MSG_SEND",
    msgHistory = "MSG_FROM_USER",
    msgRead = "MSG_READ",
    error = "ERROR",
    externalLogin = "USER_EXTERNAL_LOGIN",
    externalLogout = "USER_EXTERNAL_LOGOUT",
    msgDelete = "MSG_DELETE",
}

export interface User {
    login: string;
    password: string;
}

export interface UserResponse {
    login: string;
    isLogined: boolean;
}

export interface LoginLogoutRequest {
    id: string;
    type: TypesMessages;
    payload: {
        user: User;
    };
}

export interface LoginResponse {
    id: string;
    type: TypesMessages;
    payload: {
        user: UserResponse;
    };
}

export interface TypesRequests {
    id: string;
    type: TypesMessages;
}

export interface AllUsersRequest {
    id: string;
    type: TypesMessages;
    payload: null;
}

export interface AllUsersResponse {
    id: string;
    type: TypesMessages;
    payload: {
        users: UserResponse[];
    };
}

export enum StatusUser {
    active = "active",
    nonactive = "nonactive",
}

export interface ActiveUser {
    login: string;
    password: string;
    isLogined: boolean;
}

export interface ErrorResponse {
    id: string;
    type: TypesMessages;
    payload: {
        error: string;
    };
}

export interface MessageToUser {
    to: string;
    text: string;
}

export interface MessageRequest {
    id: string;
    type: TypesMessages;
    payload: {
        message: MessageToUser;
    };
}

export interface Message {
    id: string;
    from: string;
    to: string;
    text: string;
    datetime: number;
    status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
    };
}

export interface MessageResponse {
    id: string;
    type: TypesMessages;
    payload: {
        message: Message;
    };
}

export interface HistoryRequest {
    id: string;
    type: TypesMessages;
    payload: {
        user: {
            login: string;
        };
    };
}

export interface HistoryResponse {
    id: string;
    type: TypesMessages;
    payload: {
        messages: Message[];
    };
}

export interface MessageStatusRequest {
    id: string;
    type: TypesMessages;
    payload: {
        message: {
            id: string;
        };
    };
}

export interface MessageDeleteResponse {
    id: string;
    type: TypesMessages;
    payload: {
        message: {
            id: string;
            status: {
                isDeleted: boolean;
            };
        };
    };
}

export interface UnreadMessage {
    login: string;
    id: string;
}
