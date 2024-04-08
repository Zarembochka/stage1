import "./main.scss";
import { LoginPage } from "./pages/loginPage";

class App {
    private loginPage: LoginPage;

    constructor() {
        this.loginPage = new LoginPage();
    }

    private renderPage(page: LoginPage): void {
        document.body.innerHTML = "";
        document.body.append(page.getPage());
    }

    public render(): void {
        this.renderPage(this.loginPage);
    }
}

export const app = new App();
app.render();
