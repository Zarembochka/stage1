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

// export interface ConfigRouting {
//     "/login": Routing;
//     "/main": Routing;
// }
