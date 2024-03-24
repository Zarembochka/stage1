import { BaseComponent } from "../utils/baseComponents";

export class MainWinners extends BaseComponent {
    constructor() {
        super({ tag: "main", classNames: ["main", "main__winners"] });
        this.prepareMain();
    }

    private prepareMain(): void {
        this.createTitle();
    }

    private createTitle(): void {
        const title = new BaseComponent({
            tag: "h2",
            classNames: ["main__winners__title"],
            text: "Winners",
        }).getElement();
        this.appendElement(title);
    }
}
