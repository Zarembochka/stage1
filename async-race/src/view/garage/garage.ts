import { api } from "../../api/work_with_api";
import { BaseComponent } from "../utils/baseComponents";
import { Car, CarResponse } from "../utils/interfaces";
import { GaragePagination } from "./garage__pagination.scss/garage__pagination";

const carsPerPage = 7;

export class Garage extends BaseComponent {
    private carsCount: number;

    private pageCount: number;

    private currentPage: number;

    private garagePage: GaragePagination;

    constructor() {
        super({ tag: "div", classNames: ["garage"] });
        this.garagePage = new GaragePagination();
        this.carsCount = 0;
        this.pageCount = 1;
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

    public async addCarToGarage(event: Event): Promise<void> {
        event.preventDefault();
        const info = this.getInfoAboutCar("car_color", "car_title");
        this.carsCount += 1;
        this.updateTitle();
        const newCar = await api.createCar(info);
        if (this.carsCount <= carsPerPage) {
            this.garagePage.addCarToPage(newCar);
        }
    }

    // public async updateCar(event: Event): Promise<void> {
    //     event.preventDefault();
    //     const id =
    //     const info = this.getInfoAboutCar("update_car_color", "update_car_title");
    //     await api.updateCar(info);
    //     //const newCar = await api.createCar(info);
    // }

    // private getCarId(event: Event): number {
    //     const target = event.target as HTMLElement;
    //     const id = target.getAttribute('');
    // }

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
        const title = titleInput?.value;
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

    public removeCarFromGarage(): void {
        this.carsCount -= 1;
        this.updateTitle();
    }

    public async renderCarsFromGarage(): Promise<void> {
        const cars = await this.getCarsFromGarage();
        this.carsCount = cars.length;
        this.updateTitle();
        this.garagePage.renderCars(cars);
    }

    private async getCarsFromGarage(): Promise<CarResponse[]> {
        const cars = await api.getCars(this.currentPage, carsPerPage);
        return cars;
    }
}
