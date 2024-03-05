import { Layout } from "../abstract/classes";
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
    // private createGrid(image: Element): void {
    //     for (let i = 0; i < this.currentLevel.task.length; i += 1) {
    //         const row = document.createElement("div");
    //         row.classList.add("game__row");
    //         image.append(row);
    //     }
    // }
    private showImage(image: Element, src: string): void {
        if (image instanceof HTMLElement) {
            image.style.backgroundImage = `url("./assets/images/${src}")`;
        }
    }
    private showWords(words: Element): void {
        const wordsToShow = this.currentLevel.answer[this.question].split(" ");
        for (let i = 0; i < wordsToShow.length; i += 1) {
            const span = this.createElement("span", "game__words", wordsToShow[i]);
            words.append(span);
        }
    }
    public startGame(header: Element, task: Element, image: Element, words: Element): void {
        this.showProgress(header);
        this.showTask(task, this.currentLevel.task[this.question]);
        //this.createGrid(image);
        //this.showImage(image, this.currentLevel.image);
        this.showWords(words);
    }
}

export const newGame = new Game();
