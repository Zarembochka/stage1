import "./main.scss";
import { Page } from "./view/page/page";

class App {
    constructor() {
        this.createApp();
    }

    private createApp() {
        new Page();
    }
}

new App();
