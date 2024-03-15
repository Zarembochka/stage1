import { app } from "..";
import { STATUSSENTENCE } from "../abstract/enums";
import { Sentence } from "../abstract/interfaces";
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

    private createModal(): void {
        this.createFooter(this.modal);
        this.modalBackground.append(this.modal);
        document.body.append(this.modalBackground);
    }

    public showResults(): void {
        this.createModal();
        const sentences = app.localStorage.getSentences();
        this.showUnknownSentences(sentences);
        this.showKnownSentences(sentences);
        this.modalBackground.classList.add("show");
    }

    private createButtonOk(element: Element): void {
        const btn = this.createElement("button", "btn btn-submit btn-close", "Ok");
        btn.addEventListener("click", () => this.hideModal());
        element.append(btn);
    }

    private hideModal(): void {
        this.modalBackground.classList.remove("show");
        this.clearModal();
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
        this.clearModal();
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

    private showUnknownSentences(sentences: Sentence[]): void {
        const unknownList = this.createElement("ul", "modal__list modal__list-red", "I don't know");
        const unknownSentences = sentences.filter((item) => item.status === STATUSSENTENCE.unknown);
        for (let i = 0; i < unknownSentences.length; i += 1) {
            const text = game.getSentence(
                unknownSentences[i].round,
                unknownSentences[i].level,
                unknownSentences[i].question
            );
            const unknownItem = this.createElement("li", "modal__list__item", text);
            unknownList.append(unknownItem);
        }
        this.modal.prepend(unknownList);
    }

    private showKnownSentences(sentences: Sentence[]): void {
        const knownList = this.createElement("ul", "modal__list modal__list-green", "I know");
        const knownSentences = sentences.filter((item) => item.status === STATUSSENTENCE.known);
        for (let i = 0; i < knownSentences.length; i += 1) {
            const text = game.getSentence(knownSentences[i].round, knownSentences[i].level, knownSentences[i].question);
            const knownItem = this.createElement("li", "modal__list__item", text);
            knownList.append(knownItem);
        }
        this.modal.prepend(knownList);
    }
}

export const modalWindow = new Modal();
