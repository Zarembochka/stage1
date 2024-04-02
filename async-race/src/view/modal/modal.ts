import { BaseComponent } from "../utils/baseComponents";

class Modal extends BaseComponent {
    title: HTMLElement;

    winner: HTMLElement;

    constructor() {
        super({ tag: "div", classNames: ["modal"] });
        this.title = new BaseComponent({
            tag: "h3",
            classNames: ["modal__title"],
            text: "The winner is:",
        }).getElement();
        this.winner = new BaseComponent({
            tag: "h4",
            classNames: ["modal__title"],
        }).getElement();
        this.prepareModal();
    }

    private prepareModal(): void {
        this.getElement().append(this.title, this.winner);
    }

    private addWinner(text: string, time: number): void {
        this.winner.textContent = `${text} with time ${time.toString()}`;
        this.appendElement(this.winner);
    }

    public showModal(carTitle: string, time: number): void {
        this.addWinner(carTitle, time);
        this.addModalToDOM();
        setTimeout(() => this.hideModal(), 3500);
    }

    private hideModal(): void {
        this.getElement().remove();
    }

    private addModalToDOM(): void {
        document.body.append(this.getElement());
    }
}

export const myModal = new Modal();
