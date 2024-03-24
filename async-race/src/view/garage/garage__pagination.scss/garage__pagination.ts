import { BaseComponent } from "../../utils/baseComponents";
import { GarageRow } from "../garage__row/garage__row";

export class GaragePagination extends BaseComponent {
    constructor() {
        super({ tag: "div", classNames: ["garage__page"] });
    }

    public addCarToPage(carCount: number, color: string, title: string): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race"] }).getElement();
        const row = new GarageRow(carCount.toString(), color, title).getElement();
        wrapper.append(row);
        this.appendElement(wrapper);
    }
}
