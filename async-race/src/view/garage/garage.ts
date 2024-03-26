import { getRandomCar, getRandomTitle } from "../../utils/randomCar";
import { api } from "../../api/work_with_api";
import { BaseComponent } from "../utils/baseComponents";
import { Car, CarResponse } from "../utils/interfaces";
import { GaragePagination } from "./garage__pagination.scss/garage__pagination";

const carsPerPage = 7;

export class Garage extends BaseComponent {
    private carsCount: number;

    private currentPage: number;

    private garagePage: GaragePagination;

    constructor() {
        super({ tag: "div", classNames: ["garage"] });
        this.garagePage = new GaragePagination();
        this.carsCount = 0;
        this.currentPage = 1;
        this.prepareGarage();
    }

    private prepareGarage(): void {
        this.createTitle();
        this.createPageNumber();
        this.createGarage();
    }

    private createTitle(): void {
        const title = new BaseComponent({
            tag: "h2",
            classNames: ["garage__title"],
            text: "Garage ( 0 )",
        }).getElement();
        this.appendElement(title);
    }

    private createPageNumber(): void {
        const pageNumber = new BaseComponent({
            tag: "p",
            classNames: ["garage__page"],
            text: "Page ( 1 )",
        }).getElement();
        this.appendElement(pageNumber);
    }

    private createGarage(): void {
        this.appendElement(this.garagePage.getElement());
    }

    public addCarToGarage(event: Event): void {
        event.preventDefault();
        const car = this.getInfoAboutCar("car_color", "car_title");
        this.createCar(car);
    }

    private async createCar(car: Car): Promise<void> {
        this.carsCount += 1;
        this.updateTitle();
        const newCar = await api.createCar(car);
        if (this.carsCount <= this.currentPage * carsPerPage) {
            this.garagePage.addCarToPage(newCar);
        }
        this.checkNextPage();
    }

    public async updateCar(event: Event): Promise<void> {
        event.preventDefault();
        const id = this.getCarId(event);
        const info = this.getInfoAboutCar("update_car_color", "update_car_title");
        await api.updateCar(info, id);
        this.removeAllCarsFromGarage();
        this.renderCarsFromGarage();
        this.disableUpdateForm();
    }

    private disableUpdateForm(): void {
        const input = document.getElementById("update_car_title") as HTMLInputElement;
        const colorChoice = document.getElementById("update_car_color") as HTMLInputElement;
        const btn = document.querySelector(".btn-update") as HTMLButtonElement;
        input.disabled = true;
        input.value = "";
        colorChoice.disabled = true;
        btn.disabled = true;
        btn.removeAttribute("car-id");
    }

    private getCarId(event: Event): number {
        const target = event.target as HTMLElement;
        const id = target.getAttribute("car-id");
        return Number(id);
    }

    private getInfoAboutCar(idColor: string, idTitle: string): Car {
        const color = this.getColor(idColor);
        const title = this.getTitle(idTitle);
        return { color: color, name: title };
    }

    private getColor(id: string): string {
        const colorInput = document.getElementById(id) as HTMLInputElement;
        return colorInput?.value;
    }

    private getTitle(id: string): string {
        const titleInput = document.getElementById(id) as HTMLInputElement;
        let title = titleInput.value;
        if (!title) {
            title = getRandomTitle();
        }
        titleInput.value = "";
        return title;
    }

    private updateTitle(): void {
        const title = this.element.querySelector(".garage__title");
        if (!title) {
            return;
        }
        title.textContent = `Garage ( ${this.carsCount} )`;
    }

    private updatePageNumber(): void {
        const title = this.element.querySelector(".garage__page");
        if (!title) {
            return;
        }
        title.textContent = `Page ( ${this.currentPage} )`;
    }

    public removeCarFromGarage(): void {
        this.carsCount -= 1;
        this.updateTitle();
    }

    public async renderCarsFromGarage(): Promise<void> {
        const cars = await this.getCarsFromGarage();
        this.updateTitle();
        this.updatePageNumber();
        this.checkNextPage();
        this.garagePage.renderCars(cars);
    }

    private async getCarsFromGarage(): Promise<CarResponse[]> {
        const carResponce = await api.getCars(this.currentPage, carsPerPage);
        const carsCount = carResponce.headers.get("X-Total-Count");
        if (carsCount) {
            this.carsCount = parseInt(carsCount);
        }
        const cars = await carResponce.json();
        return cars;
    }

    private removeAllCarsFromGarage(): void {
        this.garagePage.removeAllCars();
    }

    private setEnableStatus(classname: string, flag: boolean): void {
        const btn = document.querySelector(classname) as HTMLButtonElement;
        btn.disabled = flag;
    }

    public goToNextPage(): void {
        this.currentPage += 1;
        this.removeAllCarsFromGarage();
        this.renderCarsFromGarage();
        //enable previos page btn
        this.setEnableStatus(".btn-previous", false);
    }

    public goToPreviousPage(): void {
        this.currentPage -= 1;
        this.removeAllCarsFromGarage();
        this.renderCarsFromGarage();
        if (this.currentPage === 1) {
            this.setEnableStatus(".btn-previous", true);
        }
    }

    private checkNextPage(): void {
        if (this.carsCount <= this.currentPage * carsPerPage) {
            this.setEnableStatus(".btn-next", true);
            return;
        }
        this.setEnableStatus(".btn-next", false);
    }

    public async generateRandomCars(carsCount: number): Promise<void> {
        for (let i = 1; i <= carsCount; i += 1) {
            const car = getRandomCar();
            console.log(car);
            await this.createCar(car);
        }
    }
}
