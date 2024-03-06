import { Layout } from "../../abstract/classes";
import { newGame } from "../../game/game";
import { container } from "../container/container";

class Main extends Layout {
    private main;

    constructor() {
        super();
        this.main = this.createElement("main", "main");
    }

    public createMain(): void {
        container.appendElement(this.main);
        this.main.addEventListener("animationend", (event) => this.checkAnimation(event, this));
    }

    public createStartPage(): void {
        const wrapper = this.createElement("div", "main__start");
        const title = this.createElement("h2", "main__start__title", "RSS Puzzle");
        const text = `RSS Puzzle is an interactive mini game aimed at enhancing English language skills. The game integrates various levels of difficulty, hint options and a unique puzzle-like experience with artwork`;
        const description = this.createElement("p", "main__start__description", text);
        const btn = this.addBtnStart();
        wrapper.append(title, description, btn);
        this.main.append(wrapper);
        this.main.classList.add("fade-in");
    }

    public removeMain(): void {
        this.main.innerHTML = "";
    }

    private addBtnStart(): Element {
        const btn = this.createElement("button", "btn btn-submit btn-start", "Start game");
        btn.addEventListener("click", () => this.hideStartPage(this));
        return btn;
    }

    private hideStartPage(page: Main): void {
        page.main.classList.remove("fade-in");
        page.main.classList.add("fade-out");
    }

    private checkAnimation(event: Event, page: Main): void {
        if (event instanceof AnimationEvent) {
            if (event.animationName === "fade-out") {
                page.main.classList.remove("fade-out");
                page.removeMain();
                page.createMainPage();
            }
        }
    }

    private createMainPage(): void {
        const wrapper = this.createElement("div", "main__start main__game");
        const header = this.createElement("header", "main__game__header");
        const task = this.createElement("div", "main__game__task");
        const image = this.createElement("div", "main__game__game");
        const words = this.createElement("div", "main__game__words");
        const footer = this.createElement("footer", "main__game__footer");
        wrapper.append(header, task, image, words, footer);
        this.main.append(wrapper);
        this.main.classList.add("fade-in");
        newGame.startGame(header, task, image, words);
    }
}

export const main = new Main();
