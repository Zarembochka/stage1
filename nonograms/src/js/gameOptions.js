import { removeGameField } from "./gameField";
import { startNewGame, timer } from "./gameFunctions";
import { getMatrixUserSolution } from "./matrix";
import { hideOptionsList } from "./nav";

function getObjectToSave(time, level) {
    const table = document.querySelector(".game");
    const solution = getMatrixUserSolution(table);
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

function getUserLevelFromSaveGame(saveGame) {
    return { title: saveGame.title, matrix: saveGame.matrix };
}

export function continueGame(event) {
    hideOptionsList(event.target);
    const userSaveGame = JSON.parse(localStorage.getItem("LH__game"));
    const userLevel = getUserLevelFromSaveGame(userSaveGame);
    clearInterval(timer);
    removeGameField();
    startNewGame(userLevel, userSaveGame.timer);
    colorUserSolution(userSaveGame.solution);
}

function colorUserSolution(matrix) {
    const cells = document.querySelectorAll(".game__cell");
    for (let i = 0; i < matrix.length; i += 1) {
        for (let j = 0; j < matrix.length; j += 1) {
            if (matrix[i][j] === 1) {
                const index = i * matrix.length + j;
                cells[index].classList.add("color");
            }
            if (matrix[i][j] === 2) {
                const index = i * matrix.length + j;
                cells[index].classList.add("cross");
            }
        }
    }
}
