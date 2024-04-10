import "./main.scss";
import { LoginPage } from "./pages/login/loginPage";
import { MainPage } from "./pages/main/mainPage";
import { PagesView } from "./utils/interfaces";
import { router } from "./router/router";

(function (l) {
    if (l.search[2] === "/") {
        const decoded = l.search
            .slice(1)
            .split("&")
            .map(function (s) {
                return s.replace(/~and~/g, "&");
            })
            .join("?");
        window.history.replaceState(null, "", l.pathname.slice(0, -1) + decoded + l.hash);
    }
})(window.location);

class App {
    private loginPage: LoginPage;

    private mainPage: MainPage;

    constructor() {
        this.loginPage = new LoginPage();
        this.mainPage = new MainPage();
    }

    private renderPage(page: LoginPage | MainPage): void {
        document.body.innerHTML = "";
        document.body.append(page.getPage());
    }

    public render(view: PagesView): void {
        if (view === PagesView.login) {
            this.renderPage(this.loginPage);
            return;
        }
        this.renderPage(this.mainPage);
    }
}

export const app = new App();
router.start();
