import { Layout } from "./../abstract/classes";
import { game } from "./game";

class Modal extends Layout {
    private modalBackground: Element;

    private modal: Element;

    constructor() {
        super();
        this.modalBackground = this.createElement("div", "modal__background");
        this.modalBackground.addEventListener("animationend", (event) => this.checkAnimation(event));
        this.modal = this.createElement("div", "modal");
    }

    public createModal(): void {
        this.createFooter(this.modal);
        this.modalBackground.append(this.modal);
        document.body.append(this.modalBackground);
    }

    public showResults(): void {
        this.modalBackground.classList.add("show");
    }

    private createButtonOk(element: Element): void {
        const btn = this.createElement("button", "btn btn-submit btn-close", "Ok");
        btn.addEventListener("click", () => this.hideModal());
        element.append(btn);
    }

    private hideModal(): void {
        this.modalBackground.classList.remove("show");
    }

    private showAnimation(): void {
        this.modalBackground.classList.add("fade-out");
    }

    private createButtonContinue(element: Element): void {
        const btn = this.createElement("button", "btn btn-submit btn-continue", "Continue");
        btn.addEventListener("click", () => this.showAnimation());
        element.append(btn);
    }

    private createFooter(element: Element): void {
        const footer = this.createElement("fooler", "modal__footer");
        this.createButtonContinue(footer);
        this.createButtonOk(footer);
        element.append(footer);
    }

    private showNextLevel(): void {
        //this.hideModal();
        this.modalBackground.classList.remove("fade-out");
        this.modalBackground.classList.remove("show");
        game.nextLevel();
    }

    public clearModal(): void {
        while (this.modal.firstChild) {
            this.modal.removeChild(this.modal.firstChild);
        }
    }

    private checkAnimation(event: Event): void {
        const target = event.target as HTMLElement;
        if (target) {
            if (event instanceof AnimationEvent) {
                if (event.animationName === "fade-out") {
                    this.showNextLevel();
                }
            }
        }
    }
}

export const modalWindow = new Modal();
