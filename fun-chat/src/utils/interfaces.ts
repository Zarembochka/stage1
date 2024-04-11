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
}

export interface User {
    login: string;
    password: string;
}

export interface UserResponse {
    login: string;
    isLogined: boolean;
}

export interface LoginRequest {
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
