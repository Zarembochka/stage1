import { BaseComponent } from "../utils/baseComponents";
import { GaragePagination } from "./garage__pagination.scss/garage__pagination";
//import { GarageRow } from "./garage__row/garage__row";

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
        this.carsCount += 1;
        this.updateTitle();
        if (this.carsCount <= carsPerPage) {
            this.garagePage.addCarToPage(this.carsCount);
        }
    }

    private updateTitle(): void {
        const title = this.element.querySelector(".garage__title");
        if (!title) {
            return;
        }
        title.textContent = `Garage ( ${this.carsCount} )`;
    }
}
