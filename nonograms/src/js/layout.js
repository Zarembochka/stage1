import { createHeader } from "./header";
import { createFooter } from "./footer";
import { createModal } from "./modal";
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

function createMain(container) {
    const main = createElement("main", "main");
    mainTitle = createElement("h2", "main__title");
    main.append(mainTitle);
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
}

createLayout();
