import { myModal } from "../../modal/modal";
import { BaseComponent } from "../../utils/baseComponents";
import { CarAnimationWithId, CarResponse, WinnerResponse } from "../../utils/interfaces";
import { GarageRow } from "../garage__row/garage__row";
import { api } from "../../../api/work_with_api";
import { app } from "../../..";

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
        this.cars = [];
        this.getElement().innerHTML = "";
    }

    public async startRace(cars: CarAnimationWithId[]): Promise<void> {
        await Promise.allSettled(
            cars.map((item) => this.cars.find((car) => car.car.id === item.id)?.startRaceCar(item.car, true))
        ).finally(() => this.enableResetBtn());
    }

    public async resetRace(id: number): Promise<void> {
        this.cars.find((car) => car.car.id === id)?.resetRace();
    }

    public isWinner(): boolean {
        if (this.winner) {
            return true;
        }
        return false;
    }

    public setWinner(car: CarResponse, time: number) {
        this.winner = car;
        const timeInSeconds = this.timeToSeconds(time);
        this.showWinner(car.name, timeInSeconds);
        this.addWinner(car, timeInSeconds);
    }

    private showWinner(name: string, time: number) {
        myModal.showModal(name, time);
    }

    public removeWinner(): void {
        this.winner = null;
    }

    private async addWinner(car: CarResponse, time: number): Promise<void> {
        const winners = await this.getWinners();
        if (!winners) {
            return;
        }
        const isWinners = winners.find((item) => item.id === car.id);
        if (!isWinners) {
            api.createWinner({ id: car.id, wins: 1, time: time }).finally(() => this.enableResetBtn());
            return;
        }
        api.updateWinner({ id: car.id, wins: isWinners.wins + 1, time: Math.min(time, isWinners.time) });
    }

    private enableResetBtn(): void {
        app.pageGarage.mainGarage.enableBtn(".btn-reset");
    }

    public async getWinners(): Promise<WinnerResponse[]> {
        const winners = await api.getAllWinners();
        return winners;
    }

    private timeToSeconds(time: number): number {
        const seconds = time / 1000;
        return +seconds.toFixed(2);
    }
}
