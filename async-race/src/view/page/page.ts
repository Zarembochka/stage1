import { Header } from "../header/header";

export class Page {
    constructor() {
        this.createPage();
    }

    private createPage() {
        const header = new Header().getElement();
        document.body.append(header);
    }
}
