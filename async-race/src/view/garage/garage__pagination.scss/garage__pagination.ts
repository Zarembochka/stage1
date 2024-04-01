import { myModal } from "../../modal/modal";
import { BaseComponent } from "../../utils/baseComponents";
import { CarAnimationWithId, CarResponse } from "../../utils/interfaces";
import { GarageRow } from "../garage__row/garage__row";

export class GaragePagination extends BaseComponent {
    public cars: GarageRow[];

    private winner: CarResponse | null;

    constructor() {
        super({ tag: "div", classNames: ["garage__page"] });
        this.cars = [];
        this.winner = null;
    }

    public renderCars(cars: CarResponse[]): void {
        cars.forEach((car) => this.addCarToPage(car));
    }

    public addCarToPage(car: CarResponse): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race"] }).getElement();
        const row = new GarageRow(car, this);
        this.cars.push(row);
        wrapper.append(row.getElement());
        this.appendElement(wrapper);
    }

    public removeAllCars(): void {
        this.getElement().innerHTML = "";
    }

    public async startRace(cars: CarAnimationWithId[]): Promise<void> {
        cars.forEach((item) => this.cars.find((car) => car.car.id === item.id)?.startRaceCar(item.car, true));
    }

    public resetRace(id: number): void {
        this.cars.find((car) => car.car.id === id)?.resetRace();
    }

    public isWinner(): boolean {
        if (this.winner) {
            return true;
        }
        return false;
    }

    public setWinner(car: CarResponse) {
        this.winner = car;
        this.showWinner(car.name);
    }

    private showWinner(name: string) {
        myModal.showModal(name);
    }

    public removeWinner(): void {
        this.winner = null;
    }

    // private addWinner(car: CarResponse): void {

    // }
}
