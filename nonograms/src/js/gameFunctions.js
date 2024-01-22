import { isWin } from "./win";
import { showModal } from "./modal";
import { level1 } from "./levels";

export function addGameFunctionToTable(table) {
    table.addEventListener("click", changeColor);
    table.addEventListener("click", () => checkWin(table));
    table.addEventListener("contextmenu", showCross);
    table.addEventListener("mouseover", (event) => showPointer(event, table));
    table.addEventListener("mouseout", (event) => removePointer(event, table));
}

function changeColor(event) {
    const cell = event.target.closest(".game__cell");
    cell.classList.remove("pointer");
    cell.classList.remove("cross");
    cell.classList.toggle("color");
}

function checkWin(table) {
    const flagWin = isWin(table, level1);
    if (flagWin) {
        showModal();
    }
}

function showCross(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
        event.target.classList.remove("color");
        event.target.classList.remove("pointer");
        event.target.classList.toggle("cross");
    }
}

function showPointer(event, table) {
    if (event.target !== table) {
        const col = event.target.dataset.col;
        const row = event.target.closest(".game__row");
        //event.target.classList.add("pointer");
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
