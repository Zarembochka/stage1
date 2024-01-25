import { getMatrixFromUser } from "./matrix";

function getObjectToSave(time, level) {
    const table = document.querySelector(".game");
    const solution = getMatrixFromUser(table);
    const gameToSave = {
        timer: time,
        title: level.title,
        matrix: level.matrix,
        solution: solution,
    };
    return gameToSave;
}

function saveGameToLS(time, level) {
    const game = getObjectToSave(time, level);
    localStorage.setItem("LH__game", JSON.stringify(game));
}

function addAvailabilityToBtnContinue() {
    const btn = document.querySelector(".btn-continue");
    btn.removeAttribute("disabled");
}

export function saveUserGame(time, level) {
    saveGameToLS(time, level);
    addAvailabilityToBtnContinue();
}

export function isSavedGame() {
    return localStorage.getItem("LH__game") !== null;
}
