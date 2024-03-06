import { Layout } from "../abstract/classes";
import { REPLACETO } from "../abstract/enums";
import { GameLevel } from "../abstract/interfaces";
import round1 from "../data/levels/wordCollectionLevel1.json";
import round2 from "../data/levels/wordCollectionLevel2.json";
import round3 from "../data/levels/wordCollectionLevel3.json";
import round4 from "../data/levels/wordCollectionLevel4.json";
import round5 from "../data/levels/wordCollectionLevel5.json";
import round6 from "../data/levels/wordCollectionLevel6.json";

const rounds = [round1, round2, round3, round4, round5, round6];

class Game extends Layout {
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
        header.textContent = `Round ${this.round + 1}, Level ${this.level + 1}`;
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

    public startGame(header: Element, task: Element, image: Element, words: Element): void {
        this.showProgress(header);
        this.showTask(task, this.currentLevel.task[this.question]);
        this.createGrid(image);
        //this.showImage(image, this.currentLevel.image);
        this.showWords(words, image);
    }

    private replaceWordCardToField(event: Event, game: Game, direction?: REPLACETO): void {
        const card = event.currentTarget;
        let target = document.querySelector(`[data-row="${game.question.toString()}"]`);
        if (direction) {
            target = document.querySelector(`.main__game__words`);
        }
        //const gameRow = document.querySelector(`[data-row="${game.question.toString()}"]`);
        const gameCards = target?.querySelectorAll(".game__card");
        if (card instanceof HTMLElement) {
            if (gameCards) {
                const gameFieldCard = game.findEmptyCard(gameCards) as HTMLElement;
                if (gameFieldCard) {
                    gameFieldCard.innerHTML = card.innerHTML;
                    gameFieldCard.style.width = card.style.width;
                    card.innerHTML = "";
                    card.style.width = "";
                }
            }
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
}

export const newGame = new Game();
