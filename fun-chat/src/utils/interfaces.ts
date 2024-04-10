export interface ParamsToComponent {
    tag: string;
    classNames: string[];
    text?: string;
}

export enum PagesView {
    home,
    login,
    main,
}

export interface Routing {
    path: string;
    view: PagesView;
}

export interface ConfigRouting {
    "/login": Routing;
    "/main": Routing;
}
