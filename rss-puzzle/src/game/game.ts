import { app } from "../";
import { Layout } from "../abstract/classes";
import { ACTIONWITHCLASS, REPLACETO, USERSACTIONS } from "../abstract/enums";
import { GameField, GameLevel, Hints } from "../abstract/interfaces";
import * as Logos from "../abstract/logos";
import round1 from "../data/levels/wordCollectionLevel1.json";
import round2 from "../data/levels/wordCollectionLevel2.json";
import round3 from "../data/levels/wordCollectionLevel3.json";
import round4 from "../data/levels/wordCollectionLevel4.json";
import round5 from "../data/levels/wordCollectionLevel5.json";
import round6 from "../data/levels/wordCollectionLevel6.json";

const rounds = [round1, round2, round3, round4, round5, round6];

export class Game extends Layout {
    private round;

    private level;

    private question;

    private currentLevel: GameLevel;

    private visibleHints: boolean;

    private visibleAudioHints: boolean;

    private visibleBackgroundHint: boolean;

    constructor() {
        super();
        this.round = 0;
        this.level = 0;
        this.question = 0;
        this.currentLevel = this.getLevel(this.round, this.level);
        this.visibleHints = true;
        this.visibleAudioHints = true;
        this.visibleBackgroundHint = true;
    }

    private getLevel(round: number, level: number): GameLevel {
        const dataLevel = rounds[round].rounds[level];
        const tasks = dataLevel.words.map((element) => element.textExampleTranslate);
        const answers = dataLevel.words.map((element) => element.textExample);
        const audioSrc = dataLevel.words.map((element) => element.audioExample);
        return { task: tasks, answer: answers, image: dataLevel.levelData.imageSrc, audio: audioSrc };
    }

    private showTask(element: Element, text: string): void {
        element.textContent = text;
    }

    private setHint(element: Element, text: string): void {
        element.textContent = text;
    }

    private showHint(): void {
        const hint = document.querySelector(".main__game__hint");
        hint?.classList.remove("hide");
        hint?.classList.add("fade-in");
    }

    private hideHint(): void {
        const hint = document.querySelector(".main__game__hint");
        hint?.classList.add("hide");
        hint?.classList.remove("fade-in");
    }

    private showProgress(header: Element): void {
        header.textContent = `Round ${this.round + 1}, Level ${this.level + 1}, Question ${this.question + 1}`;
    }

    private createGrid(image: Element): void {
        for (let i = 0; i < this.currentLevel.task.length; i += 1) {
            const row = document.createElement("div");
            row.setAttribute("data-row", i.toString());
            row.classList.add("game__row");
            image.append(row);
        }
    }

    private showImage(image: Element, src: string): void {
        if (image instanceof HTMLElement) {
            image.style.backgroundImage = `url("./assets/images/${src}")`;
        }
    }

    private showWords(words: Element, image: Element): void {
        const startWords = this.currentLevel.answer[this.question].split(" ");
        const firstWord = startWords[0];
        const lastWord = startWords[startWords.length - 1];
        //const wordsToShow = this.reshuffle(startWords);
        const wordsToShow = startWords;
        const wordsLength = this.getAllWordsLength(wordsToShow);
        const gameField = image.querySelector(`[data-row="${this.question.toString()}"]`);
        const startWidth = this.calculateStartWidth(wordsToShow.length);
        this.setHeight(gameField, words);
        for (let i = 0; i < wordsToShow.length; i += 1) {
            const card = this.createElement("div", "game__card") as HTMLElement;
            const word = this.createPuzzle(
                "div",
                "game__card__word",
                wordsToShow[i],
                `word_${i}`,
                firstWord,
                lastWord
            ) as HTMLElement;
            const field = this.createElement("div", "game__card") as HTMLElement;
            const width = this.calculateWidth(wordsToShow[i], wordsLength);
            //card.style.width = this.calculateWidth(wordsToShow[i], wordsLength);
            card.style.width = `${width.toString()}%`;
            card.style.zIndex = (wordsToShow.length - i).toString();
            field.style.width = startWidth;
            field.style.zIndex = (wordsToShow.length - i).toString();
            this.dragAndDropFunctions(word, field, card);
            card.append(word);
            words.append(card);
            gameField?.append(field);
            card.addEventListener("click", (event) => this.replaceWordCardToField(event, this));
            field.addEventListener("click", (event) => this.replaceWordCardToField(event, this, REPLACETO.toCardsSrc));
        }
        this.setBackgroundImage(words, image);
        this.reshuffle(words);
    }

    private createPuzzle(
        tag: string,
        classname: string,
        text: string,
        id: string,
        firstWord: string,
        lastWord: string
    ): Element {
        const puzzle = this.createElement(tag, classname);
        const leftPart = this.createElement("span", "left__part");
        const middle = this.createElement("div", "middle", text) as HTMLElement;
        const rightPart = this.createElement("span", "right__part") as HTMLElement;
        puzzle.append(leftPart, middle, rightPart);
        //puzzle.append(middle);
        if (id) {
            puzzle.setAttribute("id", id);
        }
        if (text === firstWord) {
            leftPart.classList.add("first");
        }
        if (text === lastWord) {
            rightPart.classList.add("last");
        }
        if (!this.visibleBackgroundHint) {
            middle.classList.add("noImage");
            rightPart.classList.add("noImage");
        }
        return puzzle;
    }

    private setBackgroundImage(words: Element, image: Element): void {
        const cards = words.querySelectorAll(".game__card__word");
        const imageWidth = getComputedStyle(image).width;
        let totalWidth = 0;
        const height = words.getBoundingClientRect().height;
        const top = words.getBoundingClientRect().top;
        const startWidth = words.getBoundingClientRect().left;
        for (let i = 0; i < cards.length; i += 1) {
            const rightPart = cards[i].querySelector(".right__part") as HTMLElement;
            const middle = cards[i].querySelector(".middle") as HTMLElement;
            const elementWidth = middle.getBoundingClientRect().width;
            const rightPosition = rightPart.getBoundingClientRect().left;
            const topPosition = rightPart.getBoundingClientRect().top;
            if (middle) {
                middle.style.backgroundImage = `url("./assets/images/${this.currentLevel.image}")`;
                middle.style.backgroundSize = imageWidth;
                middle.style.backgroundPosition = `top -${this.question * height}px left -${totalWidth}px`;
                totalWidth += elementWidth;
            }
            rightPart.style.backgroundImage = `url("./assets/images/${this.currentLevel.image}")`;
            rightPart.style.backgroundSize = imageWidth;
            const widthToImage = startWidth - rightPosition;
            const heightToImage = height * this.question + (topPosition - top);
            rightPart.style.backgroundPosition = `top -${heightToImage}px left ${widthToImage}px`;
        }
    }

    private dragAndDropFunctions(word: Element, field: HTMLElement, card: HTMLElement): void {
        //const middle = word.querySelector(".middle");
        word.setAttribute("draggable", "true");
        card.addEventListener("dragstart", (event) => this.dragStart(event));
        card.addEventListener("dragover", (event) => this.dragOverAndLeave(event, ACTIONWITHCLASS.add));
        card.addEventListener("dragleave", (event) => this.dragOverAndLeave(event, ACTIONWITHCLASS.remove));
        card.addEventListener("drop", (event) => this.drop(event));
        field.addEventListener("dragstart", (event) => this.dragStart(event));
        field.addEventListener("dragover", (event) => this.dragOverAndLeave(event, ACTIONWITHCLASS.add));
        field.addEventListener("dragleave", (event) => this.dragOverAndLeave(event, ACTIONWITHCLASS.remove));
        field.addEventListener("drop", (event) => this.drop(event));
    }

    private dragStart(event: Event): void {
        if (event instanceof DragEvent) {
            const target = event.target as HTMLElement;
            if (target) {
                if (event.dataTransfer) {
                    event.dataTransfer?.setData("text/plain", target.id);
                    event.dataTransfer.dropEffect = "move";
                    const row = target.closest(".game__row");
                    if (row) {
                        this.removeIncorrectClass(row);
                    }
                }
            }
        }
    }

    private drop(event: Event): void {
        if (event.target) {
            const targetElement = event.target as HTMLElement;
            const target = targetElement.closest(".game__card") as HTMLElement;
            if (event instanceof DragEvent) {
                const id = event.dataTransfer?.getData("text/plain");
                if (id) {
                    const item = document.getElementById(id) as Element;
                    if (target) {
                        target.classList.remove("drag__over");
                        const tempWidth = target.style.width;
                        const parent = item.parentElement;
                        if (parent) {
                            target.style.width = parent.style.width;
                            parent.style.width = tempWidth;
                        }
                        if (target.firstChild) {
                            const tempElement = target.firstChild;
                            this.removeChilds(target);
                            target.appendChild(item);
                            //this.removeChilds(item);
                            if (parent) {
                                parent.appendChild(tempElement);
                            }
                        } else {
                            target.append(item);
                        }
                        this.checkCorrectStatement();
                    }
                }
            }
        }
    }

    private dragOverAndLeave(event: Event, action: ACTIONWITHCLASS): void {
        event.preventDefault();
        if (event instanceof DragEvent) {
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = "move";
                const target = event.target as HTMLElement;
                if (target) {
                    const targetDiv = target.closest(".game__card");
                    if (targetDiv) {
                        if (action === ACTIONWITHCLASS.add) {
                            targetDiv.classList.add("drag__over");
                            return;
                        }
                        targetDiv.classList.remove("drag__over");
                    }
                }
            }
        }
    }

    private setHeight(field: Element | null, words: Element): void {
        if (field) {
            const height = getComputedStyle(field).height;
            if (words instanceof HTMLElement) {
                words.style.height = height;
            }
        }
    }

    private startGame(gameField: GameField): void {
        this.showProgress(gameField.header);
        this.showTask(gameField.task, this.currentLevel.task[this.question]);
        this.setHint(gameField.hint, this.currentLevel.answer[this.question]);
        if (!this.question) {
            this.createGrid(gameField.image);
        }
        if (this.visibleHints) {
            this.showHint();
        }
        if (this.visibleAudioHints) {
            this.showAudioButton();
        }
        //this.showImage(gameField.image, this.currentLevel.image);
        this.showWords(gameField.words, gameField.image);
    }

    public startNewGame(gameField: GameField, hints: Hints): void {
        this.round = 0;
        this.level = 0;
        this.question = 0;
        this.changeContinueButtonToCheck();
        this.setHintsToGame(hints);
        this.startGame(gameField);
    }

    private replaceWordCardToField(event: Event, game: Game, direction?: REPLACETO): void {
        app.mainPage.gamePage.btnCheck.setAttribute("disabled", "true");
        const card = event.currentTarget;
        let target = document.querySelector(`[data-row="${game.question.toString()}"]`);
        if (direction) {
            this.removeIncorrectClass(target);
            target = document.querySelector(`.main__game__words`);
        }
        const gameCards = target?.querySelectorAll(".game__card");
        if (card instanceof HTMLElement) {
            if (gameCards) {
                const gameFieldCard = game.findEmptyCard(gameCards) as HTMLElement;
                if (gameFieldCard) {
                    const child = card.firstElementChild;
                    if (child) {
                        gameFieldCard.append(child);
                    }
                    gameFieldCard.style.width = card.style.width;
                    this.removeChilds(card);
                    card.style.width = this.calculateStartWidth(
                        this.currentLevel.answer[this.question].split(" ").length
                    );
                }
            }
        }
        this.checkCorrectStatement();
    }

    private removeChilds(parent: Element): void {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    private findEmptyCard(cards: NodeListOf<Element>): Element | undefined {
        for (let i = 0; i < cards.length; i += 1) {
            if (!cards[i].innerHTML) {
                return cards[i];
            }
        }
    }

    private getAllWordsLength(words: string[]): number {
        const result = words.reduce((a, b) => a + b.length, 0);
        return result;
    }

    private calculateWidth(word: string, allWordsLength: number): number {
        const result = Math.round((word.length * 10000) / allWordsLength) / 100;
        return result;
        //return `${result.toString()}%`;
    }

    private calculateStartWidth(length: number): string {
        if (length) {
            const result = Math.floor(1000 / length) / 10;
            return `${result.toString()}%`;
        }
        return "";
    }

    // private reshuffle(cards: string[]): string[] {
    //     for (let i = 0; i < cards.length; i += 1) {
    //         const randomIndex = this.getRandomNumber(cards.length);
    //         const temp = cards[i];
    //         cards[i] = cards[randomIndex];
    //         cards[randomIndex] = temp;
    //     }
    //     return cards;
    // }

    private reshuffle(words: Element): void {
        const cards = words.querySelectorAll(".game__card") as NodeListOf<HTMLElement>;
        for (let i = 0; i < cards.length; i += 1) {
            const randomIndex = this.getRandomNumber(cards.length);
            const oldChild = cards[i].firstChild as Node;
            const oldWidth = cards[i].style.width;
            const newChild = cards[randomIndex].firstChild as Node;
            const newWidth = cards[randomIndex].style.width;
            cards[i].firstChild?.remove();
            cards[i].append(newChild);
            cards[i].style.width = newWidth;
            cards[randomIndex].firstChild?.remove();
            cards[randomIndex].append(oldChild);
            cards[randomIndex].style.width = oldWidth;
        }
    }

    private getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private getUserSentence(selector: string): Element[] {
        const fieldToCheck = document.querySelector(`[data-row="${this.question.toString()}"]`);
        const wordsCards = fieldToCheck?.querySelectorAll(selector);
        if (!wordsCards) {
            throw new Error("No sentence to check!");
        }
        const userSentence = Array.from(wordsCards);
        return userSentence;
    }

    private checkCorrectStatement(): void {
        const words = this.getUserSentence(".game__card__word").map((word) => word.textContent);
        if (words.length === this.currentLevel.answer[this.question].split(" ").length) {
            app.mainPage.gamePage.btnCheck.removeAttribute("disabled");
        }
    }

    private removeIncorrectClass(row: Element | null): void {
        if (row) {
            const words = row.querySelectorAll(".game__card__word.uncorrect");
            words.forEach((word) => word.classList.remove("uncorrect"));
        }
    }

    public nextLevel(): void {
        if (!this.visibleHints) {
            this.hideHint();
        }
        if (!this.visibleAudioHints) {
            this.hideAudioButton();
        }
        this.disablePrevousLevel();
        this.removeIdFromPreviousLevel();
        this.destroyWordCards();
        this.addQuestion();
        const gameField = this.prepareDataToGame();
        this.startGame(gameField);
        this.changeContinueButtonToCheck();
    }

    public contolAnimationOnButton(event: Event): void {
        if (event instanceof AnimationEvent) {
            if (event.animationName === "btn-transform-check") {
                app.mainPage.gamePage.btnCheck.setAttribute("disabled", "true");
            }
        }
    }

    private changeCheckButtonToContinue(): void {
        app.mainPage.gamePage.btnCheck.classList.remove("check");
        app.mainPage.gamePage.btnCheck.classList.add("continue");
        app.mainPage.gamePage.btnCheck.textContent = "Continue";
        app.mainPage.gamePage.btnCheck.setAttribute("action", USERSACTIONS.continue);
    }

    private changeContinueButtonToCheck(): void {
        app.mainPage.gamePage.btnCheck.classList.remove("continue");
        app.mainPage.gamePage.btnCheck.classList.add("check");
        app.mainPage.gamePage.btnCheck.textContent = "Check";
        app.mainPage.gamePage.btnCheck.setAttribute("action", USERSACTIONS.check);
        //app.mainPage.gamePage.btnCheck.setAttribute("disabled", "true");
    }

    public usersAction(): void {
        const action = app.mainPage.gamePage.btnCheck.getAttribute("action");
        if (action === USERSACTIONS.check) {
            this.checkSentence();
            return;
        }
        this.nextLevel();
    }

    public checkSentence(): void {
        const userWords = this.getUserSentence(".game__card__word");
        const answer = this.currentLevel.answer[this.question].split(" ");
        const uncorrectWords = userWords.filter((word, index) => word.textContent !== answer[index]);
        if (!uncorrectWords.length) {
            if (!this.visibleHints) {
                this.showHint();
            }
            if (!this.visibleAudioHints) {
                this.showAudioButton();
            }
            this.changeCheckButtonToContinue();
            this.showBackgroundImagesForPuzzle();
            return;
        }
        uncorrectWords.forEach((word) => word.classList.add("uncorrect"));
    }

    private addQuestion(): void {
        this.question += 1;
        if (this.question === 10) {
            this.question = 0;
            this.level += 1;
            this.clearImageField();
            if (this.level === 10) {
                this.level = 0;
                this.round += 1;
            }
            this.currentLevel = this.getLevel(this.round, this.level);
        }
    }

    private clearImageField(): void {
        const imageField = document.querySelector(".main__game__game");
        while (imageField?.firstChild) {
            imageField.removeChild(imageField.firstChild);
        }
    }

    private destroyWordCards(): void {
        const words = document.querySelector(".main__game__words");
        while (words?.firstChild) {
            words.removeChild(words.firstChild);
        }
    }

    private disablePrevousLevel(): void {
        const fieldToCheck = document.querySelector(`[data-row="${this.question.toString()}"]`);
        fieldToCheck?.classList.add("solved");
    }

    private removeIdFromPreviousLevel(): void {
        const fieldToCheck = document.querySelector(`[data-row="${this.question.toString()}"]`);
        if (fieldToCheck) {
            const cards = fieldToCheck.querySelectorAll(".game__card__word");
            if (cards) {
                cards.forEach((card) => card.removeAttribute("id"));
            }
        }
    }

    private prepareDataToGame(): GameField {
        const header = document.querySelector(".main__game__header");
        const task = document.querySelector(".main__game__task");
        const hint = document.querySelector(".main__game__hint");
        const image = document.querySelector(".main__game__game");
        const words = document.querySelector(".main__game__words");
        if (!header || !task || !hint || !image || !words) {
            throw new Error("Oops! Something's gone wrong!");
        }
        return {
            header: header,
            task: task,
            hint: hint,
            image: image,
            words: words,
        };
    }

    public autocompleteTask(): void {
        if (!this.visibleAudioHints) {
            this.showAudioButton();
        }
        if (!this.visibleHints) {
            this.showHint();
        }
        this.completeTask();
        this.disablePrevousLevel();
        this.removeIdFromPreviousLevel();
        app.mainPage.gamePage.btnCheck.removeAttribute("disabled");
        this.changeCheckButtonToContinue();
    }

    private completeTask(): void {
        const userWords = this.getUserSentence(".game__card");
        const correctWords = this.currentLevel.answer[this.question].split(" ");
        const firstWord = correctWords[0];
        const lastWord = correctWords[correctWords.length - 1];
        const wordsLength = this.getAllWordsLength(correctWords);
        for (let i = 0; i < userWords.length; i += 1) {
            this.removeChilds(userWords[i]);
            //const correctCard = this.createElement("div", "game__card__word", correctWords[i]);
            const correctCard = this.createPuzzle(
                "div",
                "game__card__word",
                correctWords[i],
                `word_${i}`,
                firstWord,
                lastWord
            );
            const currentDiv = userWords[i] as HTMLElement;
            currentDiv.style.width = `${this.calculateWidth(correctWords[i], wordsLength).toString()}%`;
            userWords[i].append(correctCard);
        }
        if (!this.visibleBackgroundHint) {
            this.showBackgroundImagesForPuzzle();
        }
        const words = document.querySelector(`[data-row="${this.question.toString()}"]`);
        const image = document.querySelector(".main__game__game");
        if (words && image) {
            this.setBackgroundImage(words, image);
        }
        const gameWords = document.querySelector(".main__game__words");
        if (gameWords) {
            const wordsCard = gameWords.querySelectorAll(".game__card");
            if (wordsCard) {
                wordsCard.forEach((card) => this.removeChilds(card));
            }
        }
    }

    private hideOrShowHints(): void {
        const btnHint = document.querySelector(".btn-hint");
        if (btnHint) {
            if (this.visibleHints) {
                this.showHint();
                btnHint.innerHTML = Logos.infoSvg;
                btnHint.setAttribute("title", "hide text hint");
                return;
            }
            this.hideHint();
            btnHint.innerHTML = Logos.hintSvg;
            btnHint.setAttribute("title", "show text hint");
        }
    }

    public showHintsInGame(): void {
        this.visibleHints = !this.visibleHints;
        this.hideOrShowHints();
        this.saveHints();
    }

    private hideOrShowAudioHints(): void {
        const btnHint = document.querySelector(".btn-audioHint");
        if (btnHint) {
            if (this.visibleAudioHints) {
                this.showAudioButton();
                btnHint.innerHTML = Logos.audioHintOffSvg;
                btnHint.setAttribute("title", "hide audio hint");
                return;
            }
            this.hideAudioButton();
            btnHint.innerHTML = Logos.audioHintOnSvg;
            btnHint.setAttribute("title", "show audio hint");
        }
    }

    public showAudioHintsInGame(): void {
        this.visibleAudioHints = !this.visibleAudioHints;
        this.hideOrShowAudioHints();
        this.saveHints();
    }

    private getPathToAudio(): string {
        const level = `https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/${this.currentLevel.audio[this.question]}?raw=true`;
        return level;
    }

    private showAudioButton(): void {
        const btnAudio = document.querySelector(".btn-audio");
        btnAudio?.classList.remove("hide");
        btnAudio?.classList.add("fade-in");
    }

    private hideAudioButton(): void {
        const btnAudio = document.querySelector(".btn-audio");
        btnAudio?.classList.add("hide");
        btnAudio?.classList.remove("fade-in");
    }

    private makeAudioIconActive(): void {
        const btnAudio = document.querySelector(".btn-audio");
        btnAudio?.classList.add("active");
        if (btnAudio) {
            btnAudio.innerHTML = Logos.playActiveSvg;
        }
    }

    private makeAudioIconInactive(): void {
        const btnAudio = document.querySelector(".btn-audio");
        btnAudio?.classList.remove("active");
        if (btnAudio) {
            btnAudio.innerHTML = Logos.playSvg;
        }
    }

    public playAudioHint(): void {
        this.makeAudioIconActive();
        const path = this.getPathToAudio();
        const audio = new Audio(path);
        audio.play();
        audio.addEventListener("ended", this.makeAudioIconInactive);
    }

    private showBackgroundImagesForPuzzle(): void {
        const puzzle = document.querySelectorAll(".noImage");
        for (let i = 0; i < puzzle.length; i += 1) {
            puzzle[i].classList.remove("noImage");
        }
    }

    private hideOrShowBackgroundHints(): void {
        const btnHint = document.querySelector(".btn-backgroundHint");
        if (btnHint) {
            if (this.visibleBackgroundHint) {
                btnHint.innerHTML = Logos.backGroungHintOffSvg;
                btnHint.setAttribute("title", "hide background hint");
                this.showBackgroundImagesForPuzzle();
                return;
            }
            btnHint.innerHTML = Logos.backGroungHintOnSvg;
            btnHint.setAttribute("title", "show background hint");
        }
    }

    public showBackgroundHint(): void {
        this.visibleBackgroundHint = !this.visibleBackgroundHint;
        this.hideOrShowBackgroundHints();
        this.saveHints();
    }

    private saveHints(): void {
        app.localStorage.saveHintsToLS({
            textHints: this.visibleHints,
            audioHints: this.visibleAudioHints,
            backgroundHints: this.visibleBackgroundHint,
        });
    }

    private setHintsToGame(hints: Hints): void {
        this.visibleHints = hints.textHints;
        this.visibleAudioHints = hints.audioHints;
        this.visibleBackgroundHint = hints.backgroundHints;
        this.hideOrShowHints();
        this.hideOrShowAudioHints();
        this.hideOrShowBackgroundHints();
    }
}
