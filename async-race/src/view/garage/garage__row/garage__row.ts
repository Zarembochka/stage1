import { BaseComponent } from "../../utils/baseComponents";
import { carSvg, finishSvg } from "../../../assets/image/logo";

export class GarageRow extends BaseComponent {
    constructor() {
        super({ tag: "div", classNames: ["garage__race__row"] });
        this.prepareGarageRow();
    }

    private prepareGarageRow(): void {
        this.createCar();
        this.createFinish();
    }

    private createCar(): void {
        const rowCar = new BaseComponent({ tag: "div", classNames: ["garage__race__row__car"] }).getElement();
        rowCar.innerHTML = carSvg;
        this.appendElement(rowCar);
    }

    private createFinish(): void {
        const finish = new BaseComponent({ tag: "div", classNames: ["garage__race__row__finish"] }).getElement();
        finish.innerHTML = finishSvg;
        this.appendElement(finish);
    }
}
