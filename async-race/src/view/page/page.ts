import { Header } from "../header/header";
import { Main } from "../main/main";

export class Page {
    constructor() {
        this.createPage();
    }

    private createPage() {
        const header = new Header().getElement();
        const main = new Main().getElement();
        document.body.append(header, main);
    }
}
