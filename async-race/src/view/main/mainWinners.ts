import { api } from "../../api/work_with_api";
import { carSvg } from "../../assets/image/logo";
import { BaseComponent } from "../utils/baseComponents";
import { WinnerResponse, WinnerRow } from "../utils/interfaces";

const winnersPerPage = 10;

export class MainWinners extends BaseComponent {
    private currentPage: number;

    private winnersCount: number;

    constructor() {
        super({ tag: "main", classNames: ["main", "main__winners"] });
        this.currentPage = 1;
        this.winnersCount = 0;
        this.prepareMain();
    }

    private prepareMain(): void {
        this.createTitle();
        this.createPageNumber();
    }

    private createPageNumber(): void {
        const pageNumber = new BaseComponent({
            tag: "p",
            classNames: ["winners__page"],
            text: "Page ( 1 )",
        }).getElement();
        this.appendElement(pageNumber);
    }

    private createTitle(): void {
        const title = new BaseComponent({
            tag: "h2",
            classNames: ["winners__title"],
            text: "Winners",
        }).getElement();
        this.appendElement(title);
    }

    private createTable(): HTMLElement {
        const table = new BaseComponent({
            tag: "div",
            classNames: ["main__table__winners"],
        }).getElement();
        return table;
    }

    private async getWinners(): Promise<WinnerResponse[]> {
        const winnerResponse = await api.getWinners(this.currentPage, winnersPerPage);
        const winnersCount = winnerResponse.headers.get("X-Total-Count");
        if (winnersCount) {
            this.winnersCount = parseInt(winnersCount);
        }
        const winners = await winnerResponse.json();
        return winners;
    }

    public async renderWinners(): Promise<void> {
        const winners = await this.getWinners();
        this.updateTitle();
        const wrapper = this.createTable();
        this.createRowToTable(wrapper, ["Number", "Image", "Model", "Wins", "Best time"]);
        this.createWinnersTable(wrapper, winners);
        this.element.append(wrapper);
        this.checkNextPage();
    }

    private updateTitle(): void {
        const title = this.element.querySelector(".winners__title");
        if (!title) {
            return;
        }
        title.textContent = `Winners ( ${this.winnersCount} )`;
    }

    private createRowToTable(wrapper: HTMLElement, row: string[]): void {
        const title = new BaseComponent({
            tag: "div",
            classNames: ["main__winners__title"],
        }).getElement();
        row.forEach((item) => {
            const span = new BaseComponent({
                tag: "span",
                classNames: ["main__winners__title-elem"],
                text: item,
            }).getElement();
            title.append(span);
        });
        wrapper.append(title);
    }

    private createWinnersRow(wrapper: HTMLElement, count: number, winnerRow: WinnerRow): void {
        const row = new BaseComponent({
            tag: "div",
            classNames: ["main__winners__row"],
        }).getElement();
        const numberField = new BaseComponent({
            tag: "span",
            classNames: ["main__winners__row__item", "main__winners__row-number"],
            text: String(count + 1),
        }).getElement();
        const imageField = new BaseComponent({
            tag: "span",
            classNames: ["main__winners__row__item", "main__winners__row-image"],
        }).getElement();
        imageField.innerHTML = carSvg;
        imageField.style.fill = winnerRow.color;
        const nameField = new BaseComponent({
            tag: "span",
            classNames: ["main__winners__row__item", "main__winners__row-name"],
            text: winnerRow.name,
        }).getElement();
        const winsField = new BaseComponent({
            tag: "span",
            classNames: ["main__winners__row__item", "main__winners__row-wins"],
            text: String(winnerRow.wins),
        }).getElement();
        const timeField = new BaseComponent({
            tag: "span",
            classNames: ["main__winners__row__item", "main__winners__row-time"],
            text: String(winnerRow.time),
        }).getElement();
        row.append(numberField, imageField, nameField, winsField, timeField);
        wrapper.append(row);
    }

    private async createWinnersTable(wrapper: HTMLElement, winners: WinnerResponse[]): Promise<void> {
        const results = await winners;
        for (let i = 0; i < results.length; i += 1) {
            const car = await api.getCar(results[i].id);
            this.createWinnersRow(wrapper, i, {
                name: car.name,
                color: car.color,
                wins: results[i].wins,
                time: results[i].time,
            });
        }
    }

    public removeWinners(): void {
        const table = document.querySelector(".main__table__winners");
        if (table) {
            this.element.removeChild(table);
        }
    }

    private checkNextPage(): void {
        if (this.winnersCount <= this.currentPage * winnersPerPage) {
            this.setEnableStatus(".btn-next", true);
            return;
        }
        this.setEnableStatus(".btn-next", false);
    }

    private setEnableStatus(classname: string, flag: boolean): void {
        const btn = document.querySelector(classname) as HTMLButtonElement;
        btn.disabled = flag;
    }

    public goToNextPage(): void {
        this.currentPage += 1;
        this.removeWinners();
        this.renderWinners();
        //enable previos page btn
        this.setEnableStatus(".btn-previous", false);
    }

    public goToPreviousPage(): void {
        this.currentPage -= 1;
        this.removeWinners();
        this.renderWinners();
        //this.renderCarsFromGarage();
        if (this.currentPage === 1) {
            this.setEnableStatus(".btn-previous", true);
        }
    }
}
