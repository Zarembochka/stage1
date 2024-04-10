import { app } from "..";
import { ConfigRouting, PagesView, Routing } from "../utils/interfaces";

const config = {
    "/login": {
        path: "/login",
        view: PagesView.login,
    },
    "/main": {
        path: "/main",
        view: PagesView.main,
    },
};

class Router {
    private config: ConfigRouting;

    constructor() {
        this.config = config;
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
        history.pushState({}, "", window.location.origin + rout.path);
        app.render(rout.view);
    }

    private addListenerToWindow(): void {
        window.addEventListener("popstate", () => {
            console.log(window.location.pathname);
        });
        //window.addEventListener("DOMContentLoaded", () => console.log(window.location.pathname));
    }
}

export const router = new Router();
