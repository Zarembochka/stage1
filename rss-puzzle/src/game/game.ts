import { app } from "..";
import { Layout } from "../abstract/classes";
import { REPLACETO, USERSACTIONS } from "../abstract/enums";
import { GameField, GameLevel } from "../abstract/interfaces";
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

    constructor() {
        super();
        this.round = 0;
        this.level = 0;
        this.question = 0;
        this.currentLevel = this.getLevel(this.round, this.level);
    }

    private getLevel(round: number, level: number): GameLevel {
        const dataLevel = rounds[round].rounds[level];
        const tasks = dataLevel.words.map((element) => element.textExampleTranslate);
        const answers = dataLevel.words.map((element) => element.textExample);
        return { task: tasks, answer: answers, image: dataLevel.levelData.imageSrc };
    }

    private showTask(element: Element, text: string): void {
        element.textContent = text;
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
        const wordsToShow = this.reshuffle(startWords);
        const wordsLength = this.getAllWordsLength(wordsToShow);
        const gameField = image.querySelector(`[data-row="${this.question.toString()}"]`);
        this.setHeight(gameField, words);
        for (let i = 0; i < wordsToShow.length; i += 1) {
            const card = this.createElement("div", "game__card") as HTMLElement;
            const word = this.createElement("div", "game__card__word", wordsToShow[i]);
            const field = this.createElement("div", "game__card") as HTMLElement;
            card.style.width = this.calculateWidth(wordsToShow[i], wordsLength);
            card.append(word);
            words.append(card);
            gameField?.append(field);
            card.addEventListener("click", (event) => this.replaceWordCardToField(event, this));
            field.addEventListener("click", (event) => this.replaceWordCardToField(event, this, REPLACETO.toCardsSrc));
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

    public startGame(gameField: GameField): void {
        this.showProgress(gameField.header);
        this.showTask(gameField.task, this.currentLevel.task[this.question]);
        if (!this.question) {
            this.createGrid(gameField.image);
        }
        //this.showImage(image, this.currentLevel.image);
        this.showWords(gameField.words, gameField.image);
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
                    gameFieldCard.innerHTML = card.innerHTML;
                    gameFieldCard.style.width = card.style.width;
                    this.removeChilds(card);
                    //card.innerHTML = "";
                    card.style.width = "";
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

    private calculateWidth(word: string, allWordsLength: number): string {
        const result = Math.floor((word.length * 1000) / allWordsLength) / 10;
        return `${result.toString()}%`;
    }

    private reshuffle(cards: string[]): string[] {
        for (let i = 0; i < cards.length; i += 1) {
            const randomIndex = this.getRandomNumber(cards.length);
            const temp = cards[i];
            cards[i] = cards[randomIndex];
            cards[randomIndex] = temp;
        }
        return cards;
    }

    private getRandomNumber(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private getUserSentence(): Element[] {
        const fieldToCheck = document.querySelector(`[data-row="${this.question.toString()}"]`);
        const wordsCards = fieldToCheck?.querySelectorAll(".game__card__word");
        if (!wordsCards) {
            throw new Error("No sentence to check!");
        }
        const userSentence = Array.from(wordsCards);
        return userSentence;
    }

    private checkCorrectStatement(): void {
        const words = this.getUserSentence().map((word) => word.textContent);
        if (words.length === this.currentLevel.answer[this.question].split(" ").length) {
            app.mainPage.gamePage.btnCheck.removeAttribute("disabled");
        }
        // const currentSentence = words.join(" ");
        // if (currentSentence === this.currentLevel.answer[this.question]) {
        //     app.mainPage.gamePage.btnCheck.removeAttribute("disabled");
        // }
    }

    private removeIncorrectClass(row: Element | null): void {
        if (row) {
            const words = row.querySelectorAll(".game__card__word.uncorrect");
            words.forEach((word) => word.classList.remove("uncorrect"));
        }
    }

    public nextLevel(): void {
        this.disablePrevousLevel();
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
        const userWords = this.getUserSentence();
        const answer = this.currentLevel.answer[this.question].split(" ");
        const uncorrectWords = userWords.filter((word, index) => word.textContent !== answer[index]);
        if (!uncorrectWords.length) {
            this.changeCheckButtonToContinue();
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

    private prepareDataToGame(): GameField {
        const header = document.querySelector(".main__game__header");
        const task = document.querySelector(".main__game__task");
        const image = document.querySelector(".main__game__game");
        const words = document.querySelector(".main__game__words");
        if (!header || !task || !image || !words) {
            throw new Error("Oops! Something's gone wrong!");
        }
        return {
            header: header,
            task: task,
            image: image,
            words: words,
        };
    }
}

//export const newGame = new Game();
