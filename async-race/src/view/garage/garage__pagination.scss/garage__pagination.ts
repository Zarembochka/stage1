import { BaseComponent } from "../../utils/baseComponents";
import { CarResponse } from "../../utils/interfaces";
import { GarageRow } from "../garage__row/garage__row";

export class GaragePagination extends BaseComponent {
    constructor() {
        super({ tag: "div", classNames: ["garage__page"] });
    }

    public renderCars(cars: CarResponse[]): void {
        cars.forEach((car) => this.addCarToPage(car));
    }

    public addCarToPage(car: CarResponse): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race"] }).getElement();
        const row = new GarageRow(car).getElement();
        wrapper.append(row);
        this.appendElement(wrapper);
    }
}
