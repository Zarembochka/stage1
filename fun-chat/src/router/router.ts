import { app } from "..";
import { ConfigRouting, PagesView, Routing } from "../utils/interfaces";

const config = {
    "/login": {
        path: "login",
        view: PagesView.login,
    },
    "/main": {
        path: "main",
        view: PagesView.main,
    },
};

class Router {
    private config: ConfigRouting;

    private pathSegmentsToKeep: number;

    constructor(pathSegmentsToKeep: number) {
        this.config = config;
        this.pathSegmentsToKeep = pathSegmentsToKeep;
        this.addListenerToWindow();
    }

    private redirectToLogin(): void {
        this.goTo(this.config["/login"]);
    }

    public start(): void {
        const localPath = window.location.pathname;
        if (!["/login", "/main"].includes(localPath)) {
            this.redirectToLogin();
            return;
        }
        this.goTo(this.config["/login"]);
    }

    public main(): void {
        this.goTo(this.config["/main"]);
    }

    private goTo(rout: Routing): void {
        const pathnameApp = window.location.pathname
            .split("/")
            .slice(1, this.pathSegmentsToKeep + 1)
            .join("/");
        history.pushState({}, "", `/${pathnameApp}/${rout.path}`);
        app.render(rout.view);
    }

    private addListenerToWindow(): void {
        window.addEventListener("popstate", () => {
            console.log(window.location.pathname);
        });
        window.addEventListener("DOMContentLoaded", () => {
            // const currentPath = window.location.pathname
            //     .split("/")
            //     .slice(this.pathSegmentsToKeep + 1)
            //     .join("/");
            this.goTo(this.config["/login"]);
        });
    }
}

const pathSegmentsToKeep = 2;
export const router = new Router(pathSegmentsToKeep);
