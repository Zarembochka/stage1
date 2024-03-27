import { BaseComponent } from "../../utils/baseComponents";
import { CarAnimationWithId, CarResponse } from "../../utils/interfaces";
import { GarageRow } from "../garage__row/garage__row";

export class GaragePagination extends BaseComponent {
    public cars: GarageRow[];

    constructor() {
        super({ tag: "div", classNames: ["garage__page"] });
        this.cars = [];
    }

    public renderCars(cars: CarResponse[]): void {
        cars.forEach((car) => this.addCarToPage(car));
    }

    public addCarToPage(car: CarResponse): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race"] }).getElement();
        const row = new GarageRow(car);
        this.cars.push(row);
        wrapper.append(row.getElement());
        this.appendElement(wrapper);
    }

    public removeAllCars(): void {
        this.getElement().innerHTML = "";
    }

    public startRace(cars: CarAnimationWithId[]): void {
        cars.forEach((item) => this.cars.find((car) => car.id === item.id)?.startRaceCar(item.car));
    }
}
