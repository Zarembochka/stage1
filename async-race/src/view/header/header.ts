import { app } from "../..";
import { BaseComponent } from "../utils/baseComponents";
import { ViewPAGE } from "../utils/enums";

export class Header extends BaseComponent {
    constructor() {
        super({ tag: "header", classNames: ["header"] });
        this.prepareHeader();
    }

    private prepareHeader(): void {
        this.createButtons();
        this.createTitle();
    }

    private createTitle(): void {
        const title = new BaseComponent({ tag: "h1", classNames: ["header__title"], text: "Async-race" }).getElement();
        this.appendElement(title);
    }

    private createButtons(): void {
        const wrapper = this.createWrapperToButtons();
        const btnGarage = this.createBtnGarage();
        const btnWinners = this.createBtnWinners();
        wrapper?.append(btnGarage, btnWinners);
    }

    private createWrapperToButtons(): Element {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["header__wrapper"] }).getElement();
        this.appendElement(wrapper);
        return wrapper;
    }

    private createBtnGarage(): Element {
        const btnGarage = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn__header", "btn-garage"],
            text: "Garage",
        }).getElement();
        btnGarage.addEventListener("click", () => app.render(ViewPAGE.garage));
        return btnGarage;
    }

    private createBtnWinners(): Element {
        const btnWinners = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn__header", "btn-winners"],
            text: "Winners",
        }).getElement();
        btnWinners.addEventListener("click", () => app.render(ViewPAGE.winners));
        return btnWinners;
    }
}
