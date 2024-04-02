import { app } from "../..";
import { api } from "../../api/work_with_api";
import { Garage } from "../garage/garage";
import { BaseComponent } from "../utils/baseComponents";
import { InputTYPES } from "../utils/enums";

const generateCarsCount = 100;

export class MainGarage extends BaseComponent {
    private garage: Garage;

    constructor() {
        super({ tag: "main", classNames: ["main", "main__garage"] });
        this.garage = new Garage();
        this.prepareMain();
    }

    private prepareMain(): void {
        this.createSettings();
        this.garage.renderCarsFromGarage();
        this.appendElement(this.garage.getElement());
    }

    private createSettings(): void {
        const wrapper = this.createWrapperToField(["main__settings"]);
        const formCreate = this.createFormNewCar();
        const formUpdate = this.createFormUpdateCar();
        const buttons = this.createSettingButtons();
        wrapper.append(formCreate, formUpdate, buttons);
    }

    private createSettingButtons(): Element {
        const wrapper = this.createWrapperToField(["main__setting__buttons"]);
        const btnRace = this.createBtn(["btn", "btn__setting", "btn-race"], "Race");
        btnRace.addEventListener("click", () => this.startRace());
        const btnReset = this.createBtn(["btn", "btn__setting", "btn-reset"], "Reset");
        btnReset.addEventListener("click", () => this.resetRace());
        btnReset.disabled = true;
        const btnGenerate = this.createBtn(["btn", "btn__setting", "btn-generate"], "Generate cars");
        btnGenerate.addEventListener("click", () => this.garage.generateRandomCars(generateCarsCount));
        wrapper.append(btnRace, btnReset, btnGenerate);
        return wrapper;
    }

    private createFormNewCar(): HTMLFormElement {
        const formCreate = this.createForm("form__create");
        const input = this.createInput(["input", "input__newCar"], InputTYPES.text, "car_title");
        const colorChoice = this.createInput(["input", "input__newCarColor"], InputTYPES.color, "car_color");
        const btn = this.createBtn(["btn", "btn__main", "btn-create"], "Create");
        btn.addEventListener("click", (event) => this.garage.addCarToGarage(event));
        formCreate?.append(input, colorChoice, btn);
        return formCreate;
    }

    private createFormUpdateCar(): HTMLFormElement {
        const formCreate = this.createForm("form__update");
        const input = this.createInput(["input", "input__updateCar"], InputTYPES.text, "update_car_title");
        input.disabled = true;
        const colorChoice = this.createInput(["input", "input__updateCarColor"], InputTYPES.color, "update_car_color");
        colorChoice.disabled = true;
        const btn = this.createBtn(["btn", "btn__main", "btn-update"], "Update");
        btn.addEventListener("click", (event) => this.garage.updateCar(event));
        btn.disabled = true;
        formCreate?.append(input, colorChoice, btn);
        return formCreate;
    }

    private createWrapperToField(classNames: string[]): Element {
        const wrapper = new BaseComponent({ tag: "div", classNames }).getElement();
        this.appendElement(wrapper);
        return wrapper;
    }

    private createForm(formClass: string): HTMLFormElement {
        const form = new BaseComponent<HTMLFormElement>({
            tag: "form",
            classNames: ["main__form", formClass],
        }).getElement();
        return form;
    }

    private createInput(classNames: string[], type: InputTYPES, id: string): HTMLInputElement {
        const input = new BaseComponent<HTMLInputElement>({
            tag: "input",
            classNames: classNames,
        }).getElement();
        input.type = type;
        input.id = id;
        if (type === InputTYPES.color) {
            input.value = "#ce63dd";
        }
        return input;
    }

    private createBtn(btnClass: string[], text: string): HTMLButtonElement {
        const btn = new BaseComponent<HTMLButtonElement>({
            tag: "button",
            classNames: btnClass,
            text: text,
        }).getElement();
        return btn;
    }

    public getCurrentPage(): number {
        return this.garage.getCurrentPage();
    }

    public getCarsPerPage(): number {
        return this.garage.getCarsPerPage();
    }

    public renderCars(): void {
        this.garage.renderCarsFromGarage();
    }

    public removeCarsFromGarage(): void {
        this.garage.removeAllCarsFromGarage();
    }

    public goToTheNextPage(): void {
        this.garage.goToNextPage();
    }

    public goToThePreviousPage(): void {
        this.garage.goToPreviousPage();
    }

    public disableBtn(classname: string): void {
        const btn = this.element.querySelector(classname) as HTMLButtonElement;
        btn.disabled = true;
    }

    public enableBtn(classname: string): void {
        const btn = this.element.querySelector(classname) as HTMLButtonElement;
        btn.disabled = false;
    }

    private async startRace(): Promise<void> {
        app.pageGarage.disableBtn(".btn-winners");
        this.disableBtn(".btn-race");
        const carsBtns = [...document.querySelectorAll<HTMLElement>(".btn-start")];
        const cars = carsBtns.map((item) => Number(item.dataset.carId)).map((id) => api.startRace(id));
        const result = (await Promise.all(cars)).map((car, index) => ({
            id: Number(carsBtns[index].dataset.carId),
            car,
        }));
        this.garage.startRace(result);
    }

    private async resetRace(): Promise<void> {
        this.disableBtn(".btn-reset");
        this.enableBtn(".btn-race");
        const carsBtns = [...document.querySelectorAll<HTMLElement>(".btn-stop")];
        const cars = carsBtns
            .map((item) => Number(item.dataset.carId))
            .map((id) => ({ id: id, car: api.stopRace(id) }));
        await Promise.allSettled(
            cars.map((car) =>
                car.car.then((res: Response) => {
                    if (res.status === 200) {
                        this.garage.resetRace(car.id);
                    }
                })
            )
        ).finally(() => {
            this.garage.removeWinner();
            app.pageGarage.enableBtn(".btn-winners");
        });

        // this.garage.removeWinner();
        // app.pageGarage.enableBtn(".btn-winners");
    }
}
