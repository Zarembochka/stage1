import { BaseComponent } from "../../utils/baseComponents";
import { carSvg, finishSvg } from "../../../assets/image/logo";

export class GarageRow extends BaseComponent {
    constructor(id: string) {
        super({ tag: "div", classNames: ["garage__race__row"] });
        this.prepareGarageRow(id);
    }

    private prepareGarageRow(id: string): void {
        this.createBtns(id);
        this.createCar(id);
        this.createFinish();
    }

    private createCar(id: string): void {
        const rowCar = new BaseComponent({ tag: "div", classNames: ["garage__race__row__car"] }).getElement();
        rowCar.id = id;
        rowCar.innerHTML = carSvg;
        this.appendElement(rowCar);
    }

    private createFinish(): void {
        const finish = new BaseComponent({ tag: "div", classNames: ["garage__race__row__finish"] }).getElement();
        finish.innerHTML = finishSvg;
        this.appendElement(finish);
    }

    private createBtns(id: string): void {
        const wrapper = new BaseComponent({ tag: "div", classNames: ["garage__race__row__btns"] }).getElement();
        const btnStart = this.createBtnStart(id);
        wrapper.append(btnStart);
        this.appendElement(wrapper);
    }

    private createBtnStart(id: string): HTMLElement {
        const btnStart = new BaseComponent({
            tag: "button",
            classNames: ["btn", "btn-race"],
            text: "Start",
        }).getElement();
        btnStart.dataset.carId = id;
        btnStart.addEventListener("click", () => this.startRace(id));
        return btnStart;
    }

    private startRace(id: string): void {
        const car = document.getElementById(id) as HTMLElement;
        const finish = document.querySelector(".garage__race__row__finish") as HTMLElement;
        const start = car.getBoundingClientRect().left;
        requestAnimationFrame((timeStep) => this.startAnimation(timeStep, car, start, finish));
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
            car.style.transform = `translateX(${percent + 10}%)`;
            requestAnimationFrame((time) => this.startAnimation(time, car, start, finish, percent + 10));
        }
    }
}
