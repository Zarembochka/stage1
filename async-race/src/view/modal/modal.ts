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

    private setWinner(carTitle: string): void {
        this.addWinner(carTitle);
    }

    private addWinner(text: string): void {
        this.winner.textContent = text;
        this.appendElement(this.winner);
    }

    public showModal(carTitle: string): void {
        this.setWinner(carTitle);
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
