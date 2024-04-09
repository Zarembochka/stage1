import "./main.scss";
import { LoginPage } from "./pages/login/loginPage";
import { MainPage } from "./pages/main/mainPage";

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

    public render(): void {
        this.renderPage(this.mainPage);
    }
}

export const app = new App();
app.render();
