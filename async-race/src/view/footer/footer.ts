import { app } from "../..";
import { BaseComponent } from "../utils/baseComponents";

export class Footer extends BaseComponent {
    constructor() {
        super({ tag: "footer", classNames: ["footer"] });
        this.preparefooter();
    }

    private preparefooter(): void {
        this.createPageButtons();
    }

    private createPageButtons(): void {
        const btnPrevious = this.createBtn(["btn", "btn__main", "btn-previous"], "<< Page");
        btnPrevious.addEventListener("click", () => app.goToThePreviousPage());
        btnPrevious.disabled = true;
        const btnNext = this.createBtn(["btn", "btn__main", "btn-next"], "Page >>");
        btnNext.addEventListener("click", () => app.goToTheNextPage());
        btnNext.disabled = true;
        this.getElement().append(btnPrevious, btnNext);
    }

    private createBtn(btnClass: string[], text: string): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: btnClass,
            text: text,
        }).getElement();
        return btn;
    }
}
