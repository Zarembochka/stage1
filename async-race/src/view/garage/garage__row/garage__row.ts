import { BaseComponent } from "../../utils/baseComponents";
import { carSvg, finishSvg } from "../../../assets/image/logo";
import { CarAnimation, CarResponse } from "../../utils/interfaces";
import { api } from "../../../api/work_with_api";
import { app } from "../../..";

export class GarageRow extends BaseComponent {
    private animation: number;

    public id: number;

    constructor(car: CarResponse) {
        super({ tag: "div", classNames: ["garage__race__row"] });
        this.animation = 0;
        this.prepareGarageRow(car);
        this.id = car.id;
    }

    private prepareGarageRow(car: CarResponse): void {
        this.createInfo(car);
        this.createStartAndStop(car.id);
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
        const btnSelect = this.createBtnSelect(car.id);
        const btnRemove = this.createBtnRemove(car.id);
        const carTitle = new BaseComponent({
            tag: "span",
            classNames: ["garage__race__row__info-title"],
            text: car.name,
        }).getElement();
        wrapper.append(btnSelect, btnRemove, carTitle);
        this.appendElement(wrapper);
    }

    private createBtnSelect(id: number): HTMLElement {
        const btnStart = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn-select"],
            text: "Select",
        }).getElement();
        btnStart.dataset.carId = String(id);
        btnStart.addEventListener("click", () => this.selectCar(id));
        return btnStart;
    }

    private createBtnRemove(id: number): HTMLElement {
        const btnRemove = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn-remove"],
            text: "Remove",
        }).getElement();
        btnRemove.dataset.carId = String(id);
        btnRemove.addEventListener("click", () => this.removeCar(id));
        return btnRemove;
    }

    private async selectCar(id: number): Promise<void> {
        const info = await this.getInfoAboutCar(id);
        this.enableUpdateForm(info, id);
    }

    private enableUpdateForm(car: CarResponse, id: number): void {
        const input = document.getElementById("update_car_title") as HTMLInputElement;
        const colorChoice = document.getElementById("update_car_color") as HTMLInputElement;
        const btn = document.querySelector(".btn-update") as HTMLButtonElement;
        input.disabled = false;
        input.value = car.name;
        colorChoice.disabled = false;
        colorChoice.value = car.color;
        btn.disabled = false;
        btn.setAttribute("car-id", String(id));
    }

    private async getInfoAboutCar(id: number): Promise<CarResponse> {
        const info = await api.getCar(id);
        return info;
    }

    private async removeCar(id: number): Promise<void> {
        const result = await api.deleteCar(id);
        if (result.status === 200) {
            await this.removeCarFromWinners(id);
            app.pageGarage.removeCarsFromGarage();
            app.pageGarage.renderCars();
            this.removeElement();
        }
    }

    private async removeCarFromWinners(id: number) {
        const winners = await api.getAllWinners();
        const isIdInWinners = winners.findIndex((item) => item.id === id);
        if (isIdInWinners !== -1) {
            await api.deleteWinner(id);
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

    private createBtnStart(id: number): HTMLButtonElement {
        const btnStart = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-drive", "btn-start"],
            text: "Start",
        }).getElement();
        btnStart.dataset.carId = String(id);
        btnStart.addEventListener("click", () => this.startRace(id));
        return btnStart;
    }

    private createBtnStop(id: number): HTMLButtonElement {
        const btnStop = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: ["btn", "btn-drive", "btn-stop"],
            text: "Stop",
        }).getElement();
        btnStop.dataset.carId = String(id);
        btnStop.disabled = true;
        btnStop.addEventListener("click", () => this.stopRaceCar());
        return btnStop;
    }

    private createStartAndStop(id: number): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race__row__startAndStop"] }).getElement();
        const btnStart = this.createBtnStart(id);
        const btnStop = this.createBtnStop(id);
        wrapper.append(btnStart, btnStop);
        this.appendElement(wrapper);
    }

    private async startRace(id: number): Promise<void> {
        const data = await this.getDurationAnimation(id);
        this.startRaceCar(data);
    }

    public async startRaceCar(data: CarAnimation): Promise<void> {
        const duration = data.distance / data.velocity;
        const car = document.getElementById(String(this.id)) as HTMLElement;
        const finish = this.element.querySelector(".garage__race__row__finish") as HTMLElement;
        this.animation = requestAnimationFrame((timeStep) => this.startAnimation(timeStep, car, finish, duration));
        this.disableBtn(".btn-start");
        this.enableBtn(".btn-stop");
        const success = await api.driveMode(this.id).catch(() => console.log(555));
        if (!success) {
            cancelAnimationFrame(this.animation);
        }
    }

    private async getDurationAnimation(id: number): Promise<CarAnimation> {
        const data = await api.startRace(id);
        return data;
    }

    private async stopRaceCar(): Promise<void> {
        const result = await api.stopRace(this.id);
        if (result.status === 200) {
            this.resetRace();
        }
    }

    public resetRace(): void {
        this.disableBtn(".btn-stop");
        this.enableBtn(".btn-start");
        cancelAnimationFrame(this.animation);
        this.moveCarToStart(this.id);
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
