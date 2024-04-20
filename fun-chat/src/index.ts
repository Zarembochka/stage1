import "./main.scss";
import { LoginPage } from "./pages/login/loginPage";
import { MainPage } from "./pages/main/mainPage";
import { PagesView } from "./utils/interfaces";
import { router } from "./router/router";
import { myModal } from "./modal/modal";
import { Controller } from "./controller/controller";
import { AboutPage } from "./pages/about/about";

(function (l) {
    if (l.search[1] === "/") {
        const decoded = l.search
            .slice(1)
            .split("&")
            .map(function (s) {
                return s.replace(/~and~/g, "&");
            })
            .join("?");
        const newPath = l.pathname.slice(0, -1) + decoded + l.hash;
        window.history.replaceState(null, "", newPath);
    }
})(window.location);

class App {
    public loginPage: LoginPage;

    public mainPage: MainPage;

    private aboutPage: AboutPage;

    constructor() {
        this.loginPage = new LoginPage();
        this.mainPage = new MainPage();
        this.aboutPage = new AboutPage();
    }

    private renderPage(page: LoginPage | MainPage | AboutPage): void {
        document.body.innerHTML = "";
        document.body.append(page.getPage(), myModal.getElement());
    }

    public render(view: PagesView): void {
        if (view === PagesView.login) {
            this.renderPage(this.loginPage);
            return;
        }
        if (view === PagesView.main) {
            this.renderPage(this.mainPage);
            return;
        }
        this.renderPage(this.aboutPage);
    }

    public clearLoginForm(): void {
        this.loginPage.clearLoginForm();
    }
}

export const app = new App();
export const controller = new Controller();
router.start();
