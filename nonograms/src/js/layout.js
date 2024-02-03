import { createHeader } from "./header";
import { createFooter } from "./footer";
import { createModal } from "./modal";
import { sandClockLogo } from "./logos";
import { startNewGame } from "./gameFunctions";

let mainTitle;

export function createElement(name, classname, text) {
    const newElement = document.createElement(name);
    newElement.className = classname;
    if (text) {
        newElement.textContent = text;
    }
    return newElement;
}

function createContainer() {
    const container = createElement("div", "container");
    document.body.append(container);
    return container;
}

function createTimer() {
    const timer = createElement("div", "main__timer");
    timer.innerHTML = sandClockLogo;
    const timerText = createElement("span", "main__timer-text", "00:00");
    timer.append(timerText);
    return timer;
}

function createMain(container) {
    const main = createElement("main", "main");
    mainTitle = createElement("h2", "main__title");
    const table = createElement("div", "main__table");
    const mainTimer = createTimer();
    main.append(mainTitle);
    main.append(mainTimer);
    main.append(table);
    container.append(main);
    startNewGame();
}

export function fillNonogramsTitle(title) {
    mainTitle.textContent = title;
}

function createLayout() {
    const container = createContainer();
    createHeader(container);
    createMain(container);
    createFooter(container);
    createModal();
    document.body.classList.add("light");
}

createLayout();
