import { BaseComponent } from "../../utils/baseComponents";
import { carSvg, finishSvg } from "../../../assets/image/logo";
import { CarResponse } from "../../utils/interfaces";
import { api } from "../../../api/work_with_api";

export class GarageRow extends BaseComponent {
    constructor(car: CarResponse) {
        super({ tag: "div", classNames: ["garage__race__row"] });
        this.prepareGarageRow(car);
    }

    private prepareGarageRow(car: CarResponse): void {
        this.createInfo(car);
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
        //btnStart.addEventListener("click", () => this.startRace(id));
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
        btnRemove.addEventListener("click", () => this.removeCar());
        return btnRemove;
    }

    // private startRace(id: string): void {
    //     const car = document.getElementById(id) as HTMLElement;
    //     const finish = document.querySelector(".garage__race__row__finish") as HTMLElement;
    //     const start = car.getBoundingClientRect().left;
    //     requestAnimationFrame((timeStep) => this.startAnimation(timeStep, car, start, finish));
    // }

    private async selectCar(id: number): Promise<void> {
        const info = await this.getInfoAboutCar(id);
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
    }

    private async getInfoAboutCar(id: number): Promise<CarResponse> {
        const info = await api.getCar(id);
        return info;
    }

    private removeCar(): void {
        this.removeElement();
    }

    private startAnimation(
        timeStep: CSSNumberish,
        car: HTMLElement,
        start: number,
        finish: HTMLElement,
        percent = 0
    ): void {
        const finishPosition = finish.getBoundingClientRect().right;
        const carPosition = start + (car.getBoundingClientRect().width * percent) / 100;
        if (finishPosition > carPosition) {
            car.style.transform = `translateX(${percent + 5}%)`;
            requestAnimationFrame((time) => this.startAnimation(time, car, start, finish, percent + 5));
        }
    }
}
