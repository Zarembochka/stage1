import { BaseComponent } from "../../utils/baseComponents";
import { carSvg, finishSvg } from "../../../assets/image/logo";
import { CarAnimation, CarResponse } from "../../utils/interfaces";
import { api } from "../../../api/work_with_api";
import { app } from "../../..";
import { GaragePagination } from "../garage__pagination.scss/garage__pagination";

export class GarageRow extends BaseComponent {
    private animation: number;

    public car: CarResponse;

    private time: number;

    private page: GaragePagination | null;

    constructor(car: CarResponse, page: GaragePagination) {
        super({ tag: "div", classNames: ["garage__race__row"] });
        this.animation = 0;
        this.car = car;
        this.prepareGarageRow(car);
        this.page = page;
        this.time = 0;
    }

    private prepareGarageRow(car: CarResponse): void {
        this.createInfo(car);
        this.createStartAndStop();
        this.createCar(car);
        this.createFinish();
    }

    private createCar(car: CarResponse): void {
        const rowCar = new BaseComponent({ tag: "div", classNames: ["garage__race__row__car"] }).getElement();
        rowCar.id = String(car.id);
        rowCar.innerHTML = carSvg;
        rowCar.style.fill = car.color;
        this.appendElement(rowCar);
    }

    private createFinish(): void {
        const finish = new BaseComponent({ tag: "div", classNames: ["garage__race__row__finish"] }).getElement();
        finish.innerHTML = finishSvg;
        this.appendElement(finish);
    }

    private createInfo(car: CarResponse): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race__row__info"] }).getElement();
        const btnSelect = this.createBtnSelect();
        const btnRemove = this.createBtnRemove();
        const carTitle = new BaseComponent({
            tag: "span",
            classNames: ["garage__race__row__info-title"],
            text: car.name,
        }).getElement();
        wrapper.append(btnSelect, btnRemove, carTitle);
        this.appendElement(wrapper);
    }

    private createBtnSelect(): HTMLElement {
        const btnStart = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn-select"],
            text: "Select",
        }).getElement();
        btnStart.dataset.carId = String(this.car.id);
        btnStart.addEventListener("click", () => this.selectCar());
        return btnStart;
    }

    private createBtnRemove(): HTMLElement {
        const btnRemove = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn-remove"],
            text: "Remove",
        }).getElement();
        btnRemove.dataset.carId = String(this.car.id);
        btnRemove.addEventListener("click", () => this.removeCar());
        return btnRemove;
    }

    private async selectCar(): Promise<void> {
        const info = await this.getInfoAboutCar();
        this.enableUpdateForm(info);
    }

    private enableUpdateForm(car: CarResponse): void {
        const input = document.getElementById("update_car_title") as HTMLInputElement;
        const colorChoice = document.getElementById("update_car_color") as HTMLInputElement;
        const btn = document.querySelector(".btn-update") as HTMLButtonElement;
        input.disabled = false;
        input.value = car.name;
        colorChoice.disabled = false;
        colorChoice.value = car.color;
        btn.disabled = false;
        btn.setAttribute("car-id", String(this.car.id));
    }

    private async getInfoAboutCar(): Promise<CarResponse> {
        const info = await api.getCar(this.car.id);
        return info;
    }

    private async removeCar(): Promise<void> {
        const result = await api.deleteCar(this.car.id);
        if (result.status === 200) {
            await this.removeCarFromWinners();
            app.pageGarage.removeCarsFromGarage();
            app.pageGarage.renderCars();
            this.removeElement();
        }
    }

    private async removeCarFromWinners(): Promise<void> {
        const winners = await this.page?.getWinners();
        if (!winners) {
            return;
        }
        const isIdInWinners = winners.findIndex((item) => item.id === this.car.id);
        if (isIdInWinners !== -1) {
            await api.deleteWinner(this.car.id);
        }
    }

    private startAnimation(
        timeStep: CSSNumberish,
        car: HTMLElement,
        finish: HTMLElement,
        duration: number,
        zero: CSSNumberish = 0
    ): void {
        if (zero === 0) {
            zero = timeStep;
        }
        const timeDrive = +timeStep - +zero;
        const finishPosition = finish.offsetLeft;
        const distance = (finishPosition * timeDrive) / duration;
        if (timeDrive < duration) {
            car.style.transform = `translateX(${distance}px)`;
            this.animation = requestAnimationFrame((time) => this.startAnimation(time, car, finish, duration, zero));
        }
    }

    private createBtnStart(): HTMLButtonElement {
        const btnStart = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-drive", "btn-start"],
            text: "Start",
        }).getElement();
        btnStart.dataset.carId = String(this.car.id);
        btnStart.addEventListener("click", () => this.startIndividualRace(false));
        return btnStart;
    }

    private createBtnStop(): HTMLButtonElement {
        const btnStop = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-drive", "btn-stop"],
            text: "Stop",
        }).getElement();
        btnStop.dataset.carId = String(this.car.id);
        btnStop.disabled = true;
        btnStop.addEventListener("click", () => this.stopRaceCar());
        return btnStop;
    }

    private createStartAndStop(): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race__row__startAndStop"] }).getElement();
        const btnStart = this.createBtnStart();
        const btnStop = this.createBtnStop();
        wrapper.append(btnStart, btnStop);
        this.appendElement(wrapper);
    }

    private async startIndividualRace(checkWinner: boolean): Promise<void> {
        const data = await this.getDurationAnimation(this.car.id);
        this.startRaceCar(data, checkWinner);
    }

    private async checkEngine(checkWinner: boolean): Promise<void> {
        api.driveMode(this.car.id).then((res: boolean) => {
            if (!res) {
                cancelAnimationFrame(this.animation);
                return;
            }
            if (checkWinner) {
                this.checkWinner();
            }
        });
    }

    private checkWinner(): void {
        if (this.page?.isWinner()) {
            return;
        }
        this.page?.setWinner(this.car, this.time);
    }

    public async startRaceCar(data: CarAnimation, checkWinner: boolean): Promise<void> {
        const duration = data.distance / data.velocity;
        this.time = duration;
        const car = document.getElementById(String(this.car.id)) as HTMLElement;
        const finish = this.element.querySelector(".garage__race__row__finish") as HTMLElement;
        this.animation = requestAnimationFrame((timeStep) => this.startAnimation(timeStep, car, finish, duration));
        this.disableBtn(".btn-start");
        this.enableBtn(".btn-stop");
        this.checkEngine(checkWinner);
    }

    private async getDurationAnimation(id: number): Promise<CarAnimation> {
        const data = await api.startRace(id);
        return data;
    }

    private async stopRaceCar(): Promise<void> {
        const result = await api.stopRace(this.car.id).catch();
        if (result.status === 200) {
            this.time = 0;
            this.resetRace();
        }
    }

    public resetRace(): void {
        this.disableBtn(".btn-stop");
        this.enableBtn(".btn-start");
        cancelAnimationFrame(this.animation);
        this.moveCarToStart(this.car.id);
    }

    private disableBtn(classname: string): void {
        const btn = this.element.querySelector(classname) as HTMLButtonElement;
        btn.disabled = true;
    }

    private enableBtn(classname: string): void {
        const btn = this.element.querySelector(classname) as HTMLButtonElement;
        btn.disabled = false;
    }

    private moveCarToStart(id: number): void {
        const car = document.getElementById(String(id)) as HTMLElement;
        car.style.transform = "";
    }
}
