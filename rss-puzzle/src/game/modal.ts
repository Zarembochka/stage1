import { app } from "..";
import { STATUSSENTENCE } from "../abstract/enums";
import { Sentence } from "../abstract/interfaces";
import { Layout } from "./../abstract/classes";
import { game } from "./game";
import { playActiveSvg, playSvg } from "../abstract/logos";

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
        this.showSentences(sentences, "modal__list-red", "I don't know", STATUSSENTENCE.unknown);
        this.showSentences(sentences, "modal__list-green", "I know", STATUSSENTENCE.known);
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

    private createBtnAudio(path: string): Element {
        const btn = this.createElement("button", "btn btn-game btn-audio");
        btn.innerHTML = playSvg;
        btn.addEventListener("click", (event) => this.playAudio(event, path));
        return btn;
    }

    private getPathToAudio(path: string): string {
        const level = `https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/${path}?raw=true`;
        return level;
    }

    private makeAudioIconActive(btn: Element): void {
        btn.classList.add("active");
        btn.innerHTML = playActiveSvg;
    }

    private makeAudioIconInactive(btn: Element): void {
        btn.classList.remove("active");
        btn.innerHTML = playSvg;
    }

    private defineBtn(event: Event): Element | undefined {
        const target = event.target as HTMLElement;
        if (target) {
            const btn = target.closest(".btn-audio");
            if (btn) {
                return btn;
            }
        }
    }

    private playAudio(event: Event, path: string): void {
        const btn = this.defineBtn(event);
        if (btn) {
            this.makeAudioIconActive(btn);
            const pathToAudio = this.getPathToAudio(path);
            const audio = new Audio(pathToAudio);
            audio.play();
            audio.addEventListener("ended", () => this.makeAudioIconInactive(btn));
        }
    }

    private showSentences(sentences: Sentence[], classname: string, title: string, status: STATUSSENTENCE): void {
        const unknownList = this.createElement("ul", `modal__list ${classname}`, title);
        const unknownSentences = sentences.filter((item) => item.status === status);
        for (let i = 0; i < unknownSentences.length; i += 1) {
            const sentenceWithAudio = game.getSentence(
                unknownSentences[i].round,
                unknownSentences[i].level,
                unknownSentences[i].question
            );
            const unknownItem = this.createElement("li", "modal__list__item");
            const btn = this.createBtnAudio(sentenceWithAudio.path);
            const span = this.createElement("span", "modal__list__text", sentenceWithAudio.sentence);
            unknownItem.append(btn, span);
            unknownList.append(unknownItem);
        }
        this.modal.prepend(unknownList);
    }
}

export const modalWindow = new Modal();
