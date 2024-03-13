import { app } from "../..";
import { Layout } from "../../abstract/classes";
import { USERSACTIONS } from "../../abstract/enums";
import { GameField, Hints } from "../../abstract/interfaces";
import { Game } from "../../game/game";
import { Container } from "../container/container";
import * as Logos from "../../abstract/logos";

export class MainLayout extends Layout {
    public main;

    private game: Game;

    public btnCheck: Element;

    public btnAutocomplete: Element;

    constructor() {
        super();
        this.main = this.createElement("main", "main");
        this.btnCheck = this.createElement("button", "btn btn-submit btn-check", "Check");
        this.btnAutocomplete = this.createElement("button", "btn btn-submit btn-autocomplete", "I don't know");
        this.game = new Game();
        this.addListeners();
    }

    private addListeners(): void {
        this.btnCheck.addEventListener("click", () => this.game.usersAction());
        this.btnCheck.addEventListener("animationend", (event) => this.game.contolAnimationOnButton(event));
        this.btnAutocomplete.addEventListener("click", () => this.game.autocompleteTask());
    }

    public createMainPart(wrapper: Container): void {
        wrapper.appendElement(this.main);
        this.main.addEventListener("animationend", this.checkAnimation);
        this.createStartPage();
    }

    private createStartPage(): void {
        const wrapper = this.createElement("div", "main__start start_page");
        const greeting = this.createElement("p", "main__start__greeting", app.localStorage.getGreeting());
        const title = this.createElement("h2", "main__start__title", "RSS Puzzle");
        const text = `RSS Puzzle is an interactive mini game aimed at enhancing English language skills. The game integrates various levels of difficulty, hint options and a unique puzzle-like experience with artwork`;
        const description = this.createElement("p", "main__start__description", text);
        const btn = this.addBtnStart();
        wrapper.append(greeting, title, description, btn);
        this.main.append(wrapper);
        this.main.classList.add("fade-in");
    }

    public removeMain(): void {
        while (this.main.firstChild) {
            this.main.removeChild(this.main.firstChild);
        }
    }

    private addBtnStart(): Element {
        const btn = this.createElement("button", "btn btn-submit btn-start", "Start game");
        btn.addEventListener("click", () => this.hideStartPage(this));
        return btn;
    }

    private hideStartPage(page: MainLayout): void {
        page.main.classList.remove("fade-in");
        page.main.classList.add("fade-out");
    }

    private checkAnimation(event: Event): void {
        if (event instanceof AnimationEvent) {
            if (event.animationName === "fade-out") {
                app.mainPage.gamePage.main.classList.remove("fade-out");
                app.mainPage.gamePage.removeMain();
                app.mainPage.gamePage.createMainPage();
            }
        }
    }

    private createBtnHint(): Element {
        const btnHint = this.createElement("button", "btn btn-game btn-options btn-hint");
        btnHint.addEventListener("click", () => this.game.showHintsInGame());
        return btnHint;
    }

    private createBtnAudioHint(): Element {
        const btnHint = this.createElement("button", "btn btn-game btn-options btn-audioHint");
        btnHint.addEventListener("click", () => this.game.showAudioHintsInGame());
        return btnHint;
    }

    private createBtnAudio(wrapper: Element): void {
        const btnAudio = this.createElement("button", "btn btn-game btn-audio hide");
        btnAudio.innerHTML = Logos.playSvg;
        btnAudio.setAttribute("title", "play audio hint");
        btnAudio.addEventListener("click", () => this.game.playAudioHint());
        wrapper.append(btnAudio);
    }

    private createBtnBackgroundHint(): Element {
        const btnBackground = this.createElement("button", "btn btn-game btn-options btn-backgroundHint");
        btnBackground.addEventListener("click", () => this.game.showBackgroundHint());
        return btnBackground;
    }

    private createHeaderToGamePage(wrapper: Element): Element {
        const header = this.createElement("header", "main__header");
        //const levels = this.createElement("div", "main__game__header");
        const levels = this.createRoundsAndLevels();
        const btns = this.createElement("div", "main__game__btns");
        const btnHint = this.createBtnHint();
        const btnAudioHint = this.createBtnAudioHint();
        const btnBackgroundHint = this.createBtnBackgroundHint();
        btns.append(btnHint, btnAudioHint, btnBackgroundHint);
        header.append(levels, btns);
        wrapper.append(header);
        return levels;
    }

    private createRoundsAndLevels(): Element {
        const levels = this.createElement("div", "main__game__header");
        const labelRound = this.createElement("label", "game__round__label", "Round");
        labelRound.setAttribute("for", "gameRound");
        const selectRound = this.createElement("select", "game__round");
        selectRound.setAttribute("id", "gameRound");
        selectRound.addEventListener("change", () => this.game.selectRound());
        const labelLevel = this.createElement("label", "game__level__label", "Level");
        labelLevel.setAttribute("for", "gameLevel");
        const selectLevel = this.createElement("select", "game__level");
        selectLevel.setAttribute("id", "gameLevel");
        selectLevel.addEventListener("change", () => this.game.selectLevel());
        levels.append(labelRound, selectRound, labelLevel, selectLevel);
        return levels;
    }

    private createGameField(wrapper: Element, header: Element): GameField {
        this.createBtnAudio(wrapper);
        const task = this.createElement("div", "main__game__task");
        const hint = this.createElement("div", "main__game__hint hide");
        const image = this.createElement("div", "main__game__game");
        const words = this.createElement("div", "main__game__words");
        const footer = this.createElement("footer", "main__game__footer");
        wrapper.append(task, hint, image, words, footer);
        this.addButtonsToFooter(footer);
        return {
            header: header,
            task: task,
            hint: hint,
            image: image,
            words: words,
        };
    }

    private createMainPage(): void {
        const wrapper = this.createElement("div", "main__start main__game");
        const header = this.createHeaderToGamePage(wrapper);
        const gameField = this.createGameField(wrapper, header);
        this.main.append(wrapper);
        this.main.classList.add("fade-in");
        const startHints = this.getHintsToStartGame();
        this.game.startNewGame(gameField, startHints);
    }

    private getHintsToStartGame(): Hints {
        const hints = app.localStorage.getHintsFromLS();
        if (!hints) {
            return { textHints: true, audioHints: true, backgroundHints: true };
        }
        return hints;
    }

    public destroyMainPage(): void {
        this.main.removeEventListener("animationend", this.checkAnimation);
        while (this.main.firstChild) {
            this.main.removeChild(this.main.firstChild);
        }
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }

    private addButtonsToFooter(footer: Element): void {
        this.btnCheck.setAttribute("disabled", "true");
        this.btnCheck.setAttribute("action", USERSACTIONS.check);
        footer.append(this.btnAutocomplete, this.btnCheck);
    }
}
