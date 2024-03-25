import { BaseComponent } from "../utils/baseComponents";
import { Car } from "../utils/interfaces";
import { GaragePagination } from "./garage__pagination.scss/garage__pagination";

const carsPerPage = 7;

export class Garage extends BaseComponent {
    private carsCount: number;

    private pageCount: number;

    private garagePage: GaragePagination;

    constructor() {
        super({ tag: "div", classNames: ["garage"] });
        this.garagePage = new GaragePagination();
        this.carsCount = 0;
        this.pageCount = 1;
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
        const info = this.getInfoAboutNewCar();
        this.carsCount += 1;
        this.updateTitle();
        if (this.carsCount <= carsPerPage) {
            this.garagePage.addCarToPage(this.carsCount, info.color, info.title);
        }
    }

    private getInfoAboutNewCar(): Car {
        const color = this.getColorToNewCar();
        const title = this.getTitleToNewCar();
        return { color: color, title: title };
    }

    private getColorToNewCar(): string {
        const colorInput = document.getElementById("car_color") as HTMLInputElement;
        return colorInput?.value;
    }

    private getTitleToNewCar(): string {
        const titleInput = document.getElementById("car_title") as HTMLInputElement;
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
}
