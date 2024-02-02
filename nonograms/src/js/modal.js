import { createElement } from "./layout";
import { getTimeToShow } from "./gameFunctions";

let modalBackground;
let modal;
const tableTitles = ["Time", "Level", "Title"];

export function createModal() {
    modalBackground = createElement("div", "modal__background");
    modal = createElement("div", "modal");
    modalBackground.append(modal);
    document.body.append(modalBackground);
    //prepareModal(modal);
}

function prepareModal(time) {
    addTitleToModal(modal, "You win!");
    addTextToModal(modal);
    addButtonClose(modal);
    addWinningTime(time);
}

function addTitleToModal(modal, modalTitle) {
    const title = createElement("h2", "modal__title", modalTitle);
    modal.append(title);
}

function addTextToModal(modal) {
    const paragraph = createElement("p", "modal__text");
    const text = createElement("pre", "modal__text");
    text.innerHTML = `  Great!
        You have solved
            the nonogram
                in <i class="modal__text-pink"></i> seconds!`;
    paragraph.append(text);
    modal.append(paragraph);
}

function addButtonClose(modal) {
    const btn = createElement("button", "btn btn-play", "Close");
    modal.append(btn);
    btn.addEventListener("click", hideModal);
}

export function showModal() {
    modalBackground.classList.add("modal-show");
}

export function prepareAndShowModal(time) {
    prepareModal(time);
    showModal();
}

function hideModal() {
    modalBackground.classList.remove("modal-show");
    clearModal();
}

function clearModal() {
    modal.innerHTML = "";
}

function addWinningTime(time) {
    const item = modalBackground.querySelector(".modal__text-pink");
    //item.textContent = getTimeToShow(time);
    item.textContent = time;
}

export function prepareModalToWinResults(results) {
    addTitleToModal(modal, "Winners");
    sortResults(results);
    convertTimeInResults(results);
    addTableResults(results);
    addButtonClose(modal);
}

function addTableResults(arr) {
    const table = createElement("table", "table__results");
    const tableHead = createTableHead();
    const tableBody = createTableBody(arr);
    table.append(tableHead);
    table.append(tableBody);
    modal.append(table);
}

function createTableHead() {
    const tableHead = createElement("tr", "table__results__row");
    for (let i = 0; i < tableTitles.length; i += 1) {
        const tableHeadTitle = createElement("th", "table__results__head", tableTitles[i]);
        tableHead.append(tableHeadTitle);
    }
    return tableHead;
}

function createTableBody(arr) {
    const tableBody = createElement("tbody", "table__results__body");
    for (let i = 0; i < arr.length; i += 1) {
        const row = createElement("tr", "table__results__row");
        const result = arr[i];
        for (let j = 0; j < result.length; j += 1) {
            const cell = createElement("td", "table__results__cell", result[j]);
            row.append(cell);
        }
        tableBody.append(row);
    }
    return tableBody;
}

function sortResults(arr) {
    arr.sort((a, b) => a[0] - b[0]);
}

function convertTimeInResults(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        const convertTime = getTimeToShow(arr[i][0]);
        arr[i][0] = convertTime;
    }
}
