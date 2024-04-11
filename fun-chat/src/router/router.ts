import { app } from "..";
import { sStorage } from "../sessionStorage/storage";
import { PagesView, PathToPage, Routing } from "../utils/interfaces";

const config = [
    {
        path: "login",
        view: PagesView.login,
    },
    {
        path: "main",
        view: PagesView.main,
    },
];

class Router {
    private config: Routing[];

    private pathSegmentsToKeep: number;

    constructor(pathSegmentsToKeep: number) {
        this.config = config;
        this.pathSegmentsToKeep = pathSegmentsToKeep;
        this.addListenerToWindow();
    }

    public start(): void {
        const user = sStorage.getActiveUser();
        if (user) {
            this.main(user.login);
            return;
        }
        this.goToPath(this.config[PathToPage.login]);
    }

    public main(name: string): void {
        this.goToPath(this.config[PathToPage.main]);
        app.setActiveUser(name);
        app.clearLoginForm();
    }

    private goToPath(rout: Routing): void {
        const pathnameApp = window.location.pathname
            .split("/")
            .slice(1, this.pathSegmentsToKeep + 1)
            .join("/");
        try {
            history.pushState({}, "", `/${pathnameApp}/${rout.path}`);
        } catch {
            history.pushState({}, "", `/${rout.path}`);
        }
        //history.pushState({}, "", `/${pathnameApp}/${rout.path}`);
        app.render(rout.view);
    }

    private getShortPath(path: string): string {
        const pathInArray = path.split("/");
        return pathInArray.at(-1) || "";
    }

    private goTo(path: string) {
        const roting = this.config.find((key) => key.path === path);
        if (roting) {
            app.render(roting.view);
        }
    }

    private addListenerToWindow(): void {
        window.addEventListener("popstate", () => {
            const path = this.getShortPath(window.location.pathname);
            this.goTo(`${path}`);
        });
        // window.addEventListener("DOMContentLoaded", () => {
        //     // const currentPath = window.location.pathname
        //     //     .split("/")
        //     //     .slice(this.pathSegmentsToKeep + 1)
        //     //     .join("/");
        //     //this.goToPath(this.config["/login"]);
        // });
    }
}

//const pathSegmentsToKeep = 2;
const pathSegmentsToKeep = 0;
export const router = new Router(pathSegmentsToKeep);
