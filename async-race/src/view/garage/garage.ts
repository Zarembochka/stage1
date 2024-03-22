import { BaseComponent } from "../utils/baseComponents";
import { GarageRow } from "./garage__row/garage__row";

export class Garage extends BaseComponent {
    constructor() {
        super({ tag: "div", classNames: ["garage"] });
        this.prepareGarage();
    }

    private prepareGarage(): void {
        this.createTitle();
        this.createPageNumber();
        this.createGarage();
    }

    private createTitle(): void {
        const title = new BaseComponent({ tag: "h2", classNames: ["garage__title"], text: "Garage" }).getElement();
        this.appendElement(title);
    }

    private createPageNumber(): void {
        const pageNumber = new BaseComponent({ tag: "p", classNames: ["garage__page"], text: "Page" }).getElement();
        this.appendElement(pageNumber);
    }

    private createGarage(): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race"] }).getElement();
        const row = new GarageRow().getElement();
        wrapper.append(row);
        this.appendElement(wrapper);
    }
}
