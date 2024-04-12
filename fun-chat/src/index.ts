import "./main.scss";
import { LoginPage } from "./pages/login/loginPage";
import { MainPage } from "./pages/main/mainPage";
import { PagesView } from "./utils/interfaces";
import { router } from "./router/router";
import { myModal } from "./modal/modal";

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

    constructor() {
        this.loginPage = new LoginPage();
        this.mainPage = new MainPage();
    }

    private renderPage(page: LoginPage | MainPage): void {
        document.body.innerHTML = "";
        document.body.append(page.getPage(), myModal.getElement());
    }

    public render(view: PagesView): void {
        if (view === PagesView.login) {
            this.renderPage(this.loginPage);
            return;
        }
        this.renderPage(this.mainPage);
    }

    public clearLoginForm(): void {
        this.loginPage.clearLoginForm();
    }
}

export const app = new App();
router.start();
