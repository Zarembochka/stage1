import "./style.scss";
import { LoginPage } from "./layout/startPage/loginPage";
import { LocalStorage } from "./layout/startPage/localStorage";
import { Main } from "./layout/main/startPage";

class App {
    public localStorage: LocalStorage;

    public loginPage: LoginPage;

    public mainPage: Main;

    constructor() {
        this.localStorage = new LocalStorage();
        this.loginPage = new LoginPage();
        this.mainPage = new Main();
    }

    public startApp(): void {
        if (this.localStorage.isUserinLS()) {
            this.mainPage.startPage();
            return;
        }
        this.loginPage.createMain();
    }
}

export const app = new App();
app.startApp();
