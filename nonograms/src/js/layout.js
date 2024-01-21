import { createFooter } from "./footer";

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

function createHeader(container) {
    const header = createElement("header", "header");
    const title = createElement("h1", "title", "Nonograms");
    header.prepend(title);
    container.prepend(header);
}

function createMain(container) {
    const main = createElement("main", "main");
    container.append(main);
}

function createLayout() {
    const container = createContainer();
    createHeader(container);
    createMain(container);
    createFooter(container);
}

createLayout();
