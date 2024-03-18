import { app } from "../..";
import { STATUSSENTENCE } from "../../abstract/enums";
import { Sentence } from "../../abstract/interfaces";
import { Layout } from "../../abstract/classes";
import { game } from "../../game/game";
import { playActiveSvg, playSvg } from "../../abstract/logos";
import { Container } from "../container/container";

class Statistic extends Layout {
    private modal: Element;

    private wrapper;

    constructor() {
        super();
        this.wrapper = new Container("statistics");
        this.modal = this.createElement("main", "main__statistic");
        this.modal.addEventListener("animationend", (event) => this.checkAnimation(event));
    }

    public createPage(): void {
        this.wrapper.createContainer();
        this.wrapper.appendElement(this.modal);
        this.createFooter(this.modal);
    }

    public showResults(): void {
        app.mainPage.destroyPage();
        this.createPage();
        const wrapperToSentences = this.createElement("div", "modal__sentences");
        const sentences = app.localStorage.getSentences();
        this.showSentences(wrapperToSentences, sentences, "modal__list-green", "I know", STATUSSENTENCE.known);
        this.showSentences(wrapperToSentences, sentences, "modal__list-red", "I don't know", STATUSSENTENCE.unknown);
        this.modal.prepend(wrapperToSentences);
        this.showArtwork(sentences[0]);
    }

    // private createButtonOk(element: Element): void {
    //     const btn = this.createElement("button", "btn btn-submit btn-close", "Ok");
    //     btn.addEventListener("click", () => this.hideModal());
    //     element.append(btn);
    // }

    private hideModal(): void {
        this.clearModal();
    }

    private showAnimation(): void {
        this.modal.classList.add("fade-out");
    }

    private createButtonContinue(element: Element): void {
        const btn = this.createElement("button", "btn btn-submit btn-continue", "Continue");
        btn.addEventListener("click", () => this.showAnimation());
        element.append(btn);
    }

    private createFooter(element: Element): void {
        const footer = this.createElement("fooler", "modal__footer");
        this.createButtonContinue(footer);
        element.append(footer);
    }

    private showNextLevel(): void {
        this.modal.classList.remove("fade-out");
        this.destroyPage();
        app.mainPage.wrapper.createContainer();
        app.mainPage.header.createHeader(app.mainPage.wrapper);
        app.mainPage.gamePage.createMainToContinueGame(app.mainPage.wrapper);
        game.showButtonAutoComplete();
    }

    public clearModal(): void {
        while (this.modal.firstChild) {
            this.modal.removeChild(this.modal.firstChild);
        }
    }

    public destroyPage(): void {
        while (this.modal.firstChild) {
            this.modal.removeChild(this.modal.firstChild);
        }
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
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

    private showSentences(
        wrapper: Element,
        sentences: Sentence[],
        classname: string,
        title: string,
        status: STATUSSENTENCE
    ): void {
        const unknownList = this.createElement("ul", `modal__list ${classname}`, title);
        const unknownSentences = sentences.filter((item) => item.status === status);
        for (let i = 0; i < unknownSentences.length; i += 1) {
            const sentenceWithAudio = game.getSentence(
                unknownSentences[i].round,
                unknownSentences[i].level,
                unknownSentences[i].question
            );
            const unknownItem = this.createElement("li", "modal__list__item");
            const btn = this.createBtnAudio(sentenceWithAudio.pathToAudio);
            const span = this.createElement("span", "modal__list__text", sentenceWithAudio.sentence);
            unknownItem.append(btn, span);
            unknownList.append(unknownItem);
        }
        wrapper.append(unknownList);
    }

    private getImageName(round: number, level: number): string {
        const imageName = game.getImage(round, level);
        return imageName;
    }

    private getPathToImage(imageName: string): string {
        return `./assets/images/${imageName}`;
    }

    private getImage(round: number, level: number): Element {
        const imageName = this.getImageName(round, level);
        const pathToImage = this.getPathToImage(imageName);
        const img = new Image();
        img.src = pathToImage;
        img.classList.add("modal__miniature");
        return img;
    }

    private showArtwork(sentence: Sentence): void {
        const image = this.getImage(sentence.round, sentence.level);
        const imageDescription = game.getImageDescription(sentence.round, sentence.level);
        const title = this.createElement("h3", "modal__title", imageDescription);
        this.modal.prepend(title, image);
    }
}

export const statisticPage = new Statistic();
