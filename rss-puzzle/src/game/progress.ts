import { UserProgress } from "../abstract/interfaces";
import { game, rounds } from "./game";
import { app } from "..";

class Progress {
    private roundSelect: HTMLSelectElement | null;

    private levelSelect: HTMLSelectElement | null;

    constructor() {
        this.roundSelect = null;
        this.levelSelect = null;
    }

    public setSelectFields(round: HTMLSelectElement, level: HTMLSelectElement) {
        this.roundSelect = round;
        this.levelSelect = level;
    }

    public fillRoundsAndLevels(progress: UserProgress): void {
        if (this.roundSelect) {
            this.fillRounds(this.roundSelect, progress.currentRound);
            this.fillLevels(progress.currentRound, progress.currentLevel);
            if (progress.rounds.length) {
                this.setUserRoundProgress(this.roundSelect, progress.rounds);
            }
            if (progress.completedlevels.length) {
                this.setUserLevelProgress(progress.completedlevels);
            }
        }
    }

    private setUserRoundProgress(select: HTMLSelectElement, progress: string[]): void {
        for (let i = 0; i < rounds.length; i += 1) {
            select.options[i].textContent = progress[i];
        }
    }

    private setUserLevelProgress(progress: number[]): void {
        const select = document.querySelector(".game__level") as HTMLSelectElement;
        for (let i = 0; i < progress.length; i += 1) {
            const index = progress[i];
            select.options[index].classList.add("completed");
        }
    }

    private fillRounds(select: HTMLSelectElement, round: number): void {
        //const select = document.querySelector(".game__round") as HTMLSelectElement;
        for (let i = 0; i < rounds.length; i += 1) {
            const option = new Option(`${i + 1}`, `${i}`);
            option.classList.add("game__option");
            select.add(option);
        }
        select.options[round].selected = true;
    }

    public showNewLevels(round: number): void {
        this.removeLevels();
        this.fillLevels(round, 0);
    }

    private removeLevels(): void {
        const select = document.querySelector(".game__level");
        while (select?.firstChild) {
            select.removeChild(select.firstChild);
        }
    }

    private fillLevels(round: number, level: number): void {
        //const select = document.querySelector(".game__level") as HTMLSelectElement;
        if (this.levelSelect) {
            const levels = rounds[round].roundsCount;
            for (let i = 0; i < levels; i += 1) {
                const option = new Option(`${i + 1}`, `${i}`);
                option.classList.add("game__option");
                this.levelSelect.add(option);
            }
            this.levelSelect.options[level].selected = true;
        }
    }

    public selectRound(): void {
        if (this.roundSelect) {
            if (this.levelSelect) {
                const round = +this.roundSelect.value;
                const level = +this.levelSelect.value;
                game.setRoundAndLevel(round, level);
                this.startNewRound();
                this.removeLevels();
                this.fillLevels(round, level);
            }
        }
    }

    public selectLevel(): void {
        if (this.levelSelect) {
            if (this.roundSelect) {
                const round = +this.roundSelect.value;
                const level = +this.levelSelect.value;
                game.setRoundAndLevel(round, level);
                this.startNewRound();
            }
        }
    }

    private startNewRound(): void {
        game.clearImageField();
        game.destroyWordCards();
        game.setCurrentLevel();
        const gameField = game.prepareDataToGame();
        game.startGame(gameField);
        game.changeContinueButtonToCheck();
    }

    public showProgressToUser(round: number, level: number): void {
        this.showRoundToUser(round);
        this.showLevelToUser(level);
    }

    private showRoundToUser(round: number): void {
        if (this.roundSelect) {
            this.roundSelect.options[round].selected = true;
        }
    }

    private showLevelToUser(level: number): void {
        if (this.levelSelect) {
            this.levelSelect.options[level].selected = true;
        }
    }

    private makeLevelComplete(level: number): void {
        if (this.levelSelect) {
            this.levelSelect.options[level].classList.add("completed");
        }
    }

    private makeRoundComplete(round: number, level: number, progress: number): void {
        if (this.roundSelect) {
            this.roundSelect.options[round].textContent = `${round + 1} ${progress}%`;
            if (progress >= 100) {
                this.roundSelect.options[level].classList.add("completed");
            }
            //select.options[this.level].classList.add("completed");
        }
    }

    private calculateProgressRound(round: number): number {
        const completeadLevels = document.querySelectorAll(".game__option.completed").length;
        const totalLevelsInRound = rounds[round].roundsCount;
        const progress = Math.round((completeadLevels * 100) / totalLevelsInRound);
        return progress;
    }

    public updateInfoRoundsAndLevels(round: number, level: number): void {
        this.makeLevelComplete(level);
        const percentProgress = this.calculateProgressRound(round);
        this.makeRoundComplete(round, level, percentProgress);
    }

    public saveUserProgress(round: number, level: number): void {
        const userProgress = this.prepareUserProgressToSave(round, level);
        app.localStorage.saveProgressToLS(userProgress);
    }

    public setZeroProgressForRounds(): void {
        const select = document.querySelector(".game__round") as HTMLSelectElement;
        for (let i = 0; i < rounds.length; i += 1) {
            select.options[i].classList.remove("completed");
            select.options[i].textContent = `${i + 1}`;
        }
    }

    private prepareUserProgressToSave(round: number, level: number): UserProgress {
        const roundSelect = document.querySelector(".game__round") as HTMLSelectElement;
        const levelSelect = document.querySelector(".game__level") as HTMLSelectElement;
        const roundProgress = this.getRoundsProgress(roundSelect);
        const levelProgress = this.getLevelsProgress(levelSelect);
        return {
            rounds: roundProgress,
            currentRound: round,
            currentLevel: level,
            completedlevels: levelProgress,
        };
    }

    private getRoundsProgress(select: HTMLSelectElement): string[] {
        const arrayOptions = Array.from(select.options);
        const result = arrayOptions.map((item) => (item.textContent ? item.textContent : ""));
        return result;
    }

    private getLevelsProgress(select: HTMLSelectElement): number[] {
        const arrayOptions = Array.from(select.options);
        const result = arrayOptions.filter((item) => item.classList.contains("completed")).map((item) => item.index);
        return result;
    }

    public disableRoundAndLevelChoice(): void {
        this.roundSelect?.classList.add("disabled");
        this.levelSelect?.classList.add("disabled");
    }

    public enableRoundAndLevelChoice(): void {
        this.roundSelect?.classList.remove("disabled");
        this.levelSelect?.classList.remove("disabled");
    }
}

export const gameProgress = new Progress();
