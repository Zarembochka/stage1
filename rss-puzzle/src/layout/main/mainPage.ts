import { app } from "../..";
import { Layout } from "../../abstract/classes";
import { USERSACTIONS } from "../../abstract/enums";
import { GameField, Hints, UserProgress } from "../../abstract/interfaces";
import { game } from "../../game/game";
import { Container } from "../container/container";
import * as Logos from "../../abstract/logos";
import { gameProgress } from "../../game/progress";
//import { modalWindow } from "../../game/modal";
import { statisticPage } from "../statistic/statistic";

export class MainLayout extends Layout {
    public main;

    //private game: Game;

    public btnCheck: Element;

    public btnAutocomplete: Element;

    public btnResult: Element;

    constructor() {
        super();
        this.main = this.createElement("main", "main");
        this.btnCheck = this.createElement("button", "btn btn-submit btn-check", "Check");
        this.btnAutocomplete = this.createElement("button", "btn btn-submit btn-autocomplete", "I don't know");
        this.btnResult = this.createElement("button", "btn btn-submit btn-result", "Result");
        //this.game = new Game();
        this.addListeners();
    }

    private addListeners(): void {
        this.btnCheck.addEventListener("click", () => game.usersAction());
        this.btnCheck.addEventListener("animationend", (event) => game.contolAnimationOnButton(event));
        this.btnAutocomplete.addEventListener("click", () => game.autocompleteTask());
        this.btnResult.addEventListener("click", () => statisticPage.showResults());
    }

    public createMainPart(wrapper: Container): void {
        wrapper.appendElement(this.main);
        this.main.addEventListener("animationend", this.checkAnimation);
        this.createStartPage();
    }

    public createMainToContinueGame(wrapper: Container): void {
        wrapper.appendElement(this.main);
        this.main.addEventListener("animationend", this.checkAnimation);
        this.createMainPage();
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
        btn.addEventListener("click", () => this.hideStartPage());
        return btn;
    }

    private hideStartPage(): void {
        this.main.classList.remove("fade-in");
        this.main.classList.add("fade-out");
    }

    private checkAnimation(event: Event): void {
        const target = event.target as HTMLElement;
        if (target) {
            if (event instanceof AnimationEvent) {
                if (event.animationName === "fade-out" && target.classList.contains("main")) {
                    app.mainPage.gamePage.main.classList.remove("fade-out");
                    app.mainPage.gamePage.removeMain();
                    app.mainPage.gamePage.createMainPage();
                }
                if (event.animationName === "fade-out" && target.classList.contains("main__game__game")) {
                    target.classList.remove("fade-out");
                    game.showLevelEnd();
                }
            }
        }
    }

    private createBtnHint(): Element {
        const btnHint = this.createElement("button", "btn btn-game btn-options btn-hint");
        btnHint.addEventListener("click", () => game.showHintsInGame());
        return btnHint;
    }

    private createBtnAudioHint(): Element {
        const btnHint = this.createElement("button", "btn btn-game btn-options btn-audioHint");
        btnHint.addEventListener("click", () => game.showAudioHintsInGame());
        return btnHint;
    }

    private createBtnAudio(wrapper: Element): void {
        const btnAudio = this.createElement("button", "btn btn-game btn-audio hide");
        btnAudio.innerHTML = Logos.playSvg;
        btnAudio.setAttribute("title", "play audio hint");
        btnAudio.addEventListener("click", () => game.playAudioHint());
        wrapper.append(btnAudio);
    }

    private createBtnBackgroundHint(): Element {
        const btnBackground = this.createElement("button", "btn btn-game btn-options btn-backgroundHint");
        btnBackground.addEventListener("click", () => game.showBackgroundHint());
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
        const selectRound = this.createElement("select", "game__round") as HTMLSelectElement;
        selectRound.setAttribute("id", "gameRound");
        selectRound.addEventListener("change", () => gameProgress.selectRound());
        const labelLevel = this.createElement("label", "game__level__label", "Level");
        labelLevel.setAttribute("for", "gameLevel");
        const selectLevel = this.createElement("select", "game__level") as HTMLSelectElement;
        selectLevel.setAttribute("id", "gameLevel");
        selectLevel.addEventListener("change", () => gameProgress.selectLevel());
        levels.append(labelRound, selectRound, labelLevel, selectLevel);
        gameProgress.setSelectFields(selectRound, selectLevel);
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

    public appendWrapper(wrapper: Container): void {
        wrapper.appendElement(this.main);
    }

    public createMainPage(): void {
        const wrapper = this.createElement("div", "main__start main__game");
        const header = this.createHeaderToGamePage(wrapper);
        const gameField = this.createGameField(wrapper, header);
        this.main.append(wrapper);
        this.main.classList.add("fade-in");
        const startHints = this.getHintsToStartGame();
        const progress = this.getProgressToStartGame();
        game.startNewGame(gameField, startHints, progress);
    }

    private getProgressToStartGame(): UserProgress {
        const progress = app.localStorage.getProgressFromLS();
        if (!progress) {
            return { currentRound: 0, currentLevel: 0, completedlevels: [], rounds: [] };
        }
        return progress;
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
        this.btnResult.classList.add("hide");
        footer.append(this.btnAutocomplete, this.btnCheck, this.btnResult);
    }
}
