import { isWin } from "./win";
import { prepareAndShowModal } from "./modal";
import { removeGameField, createGameField, clearGameField } from "./gameField";
import { getRandomEasyLevel } from "./levelsChoice";
import { fillNonogramsTitle } from "./layout";
import { hideMenuLists, hideOptionsList, disableBtnSave, enableBtnSave } from "./nav";
import { saveUserGame, colorUserSolution, saveWinResult } from "./gameOptions";
import { playSoundColor, playSoundCross, playSoundWin } from "./music";

let userLevel;
let isPlayedGame = false;
export let timer;
let userTime = 0;

export function addGameFunctionToTable(table) {
    table.addEventListener("click", startTimer);
    table.addEventListener("click", changeColor);
    table.addEventListener("click", () => checkWin(table));
    table.addEventListener("contextmenu", showCross);
    table.addEventListener("mouseover", (event) => showPointer(event, table));
    table.addEventListener("mouseout", (event) => removePointer(event, table));
}

function changeColor(event) {
    const cell = event.target.closest(".game__cell");
    if (cell) {
        cell.classList.remove("pointer");
        cell.classList.remove("cross");
        cell.classList.toggle("color");
        playSoundColor(cell);
    }
}

function checkWin(table) {
    const flagWin = isWin(table, userLevel.matrix);
    if (flagWin) {
        playSoundWin();
        isPlayedGame = false;
        clearInterval(timer);
        prepareAndShowModal(userTime);
        disableBtnSave();
        disableTableField(table);
        saveWinResult(userTime, userLevel.difficulty, userLevel.title);
    }
}

function showCross(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
        event.target.classList.remove("color");
        event.target.classList.remove("pointer");
        event.target.classList.toggle("cross");
        playSoundCross();
    }
}

function showPointer(event, table) {
    if (event.target !== table) {
        const col = event.target.dataset.col;
        const row = event.target.closest(".game__row");
        const cols = table.querySelectorAll(`.game__cell[data-col="${col}"]`);
        cols.forEach((element) => element.classList.add("pointer"));
        const cells = row.querySelectorAll(".game__cell");
        cells.forEach((element) => element.classList.add("pointer"));
    }
}

function removePointer(event, table) {
    if (event.target !== table) {
        const col = event.target.dataset.col;
        const row = event.target.closest(".game__row");
        const cols = table.querySelectorAll(`.game__cell[data-col="${col}"]`);
        cols.forEach((element) => element.classList.remove("pointer"));
        const cells = row.querySelectorAll(".game__cell");
        cells.forEach((element) => element.classList.remove("pointer"));
    }
}

function getLevel(level) {
    if (level) {
        return level;
    }
    return getRandomEasyLevel();
}

function setTimerTime(time) {
    userTime = time;
    const mainTimer = document.querySelector(".main__timer-text");
    mainTimer.textContent = getTimeToShow(userTime);
}

export function startNewGame(level, time) {
    userLevel = getLevel(level);
    if (time !== undefined) {
        setTimerTime(time);
    }
    fillNonogramsTitle(userLevel.title);
    const main = document.querySelector(".main");
    createGameField(main, userLevel.matrix);
}

export function playLevel(event, level, time) {
    hideMenuLists(event.target);
    removeGameField();
    clearTimerField();
    startNewGame(level, time);
}

export function restartGame(event) {
    hideOptionsList(event.target);
    enableBtnSave();
    isPlayedGame = false;
    clearInterval(timer);
    clearGameField();
    clearTimerField();
    enableTableField();
}

function startTimer(event) {
    if (!isPlayedGame) {
        const cell = event.target.closest(".game__cell");
        if (cell) {
            isPlayedGame = true;
            startInterval();
        }
    }
}

function startInterval() {
    const mainTimer = document.querySelector(".main__timer-text");
    timer = setInterval(() => updateTime(mainTimer), 1000);
}

function updateTime(item) {
    userTime += 1;
    item.textContent = getTimeToShow(userTime);
}

function clearTimerField() {
    userTime = 0;
    const mainTimer = document.querySelector(".main__timer-text");
    mainTimer.textContent = "00:00";
}

export function getTimeToShow(time) {
    const minutes = Math.floor(time / 60);
    const minutesToShow = minutes.toString().padStart(2, "0");
    const seconds = time - minutes * 60;
    const secondsToShow = seconds.toString().padStart(2, "0");
    return `${minutesToShow}:${secondsToShow}`;
}

export function saveGame(event) {
    hideOptionsList(event.target);
    saveUserGame(userTime, userLevel);
}

export function showSolution() {
    clearInterval(timer);
    clearGameField();
    colorUserSolution(userLevel.matrix);
    const table = document.querySelector(".game");
    disableTableField(table);
    disableBtnSave();
}

function disableTableField(table) {
    table.classList.add("disabled");
}

function enableTableField() {
    const table = document.querySelector(".game");
    table.classList.remove("disabled");
}
