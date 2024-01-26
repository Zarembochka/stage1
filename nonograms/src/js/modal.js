import { createElement } from "./layout";

let modalBackground;

export function createModal() {
    modalBackground = createElement("div", "modal__background");
    const modal = createElement("div", "modal");
    modalBackground.append(modal);
    document.body.append(modalBackground);
    prepareModal(modal);
}

function prepareModal(modal) {
    addTitleToModal(modal);
    addTextToModal(modal);
    addButtonPlayAgain(modal);
}

function addTitleToModal(modal) {
    const title = createElement("h2", "modal__title", "You win!");
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

function addButtonPlayAgain(modal) {
    const btn = createElement("button", "btn btn-play", "Close");
    modal.append(btn);
    btn.addEventListener("click", hideModal);
}

export function showModal(time) {
    addWinningTime(time);
    modalBackground.classList.add("modal-show");
}

function hideModal() {
    modalBackground.classList.remove("modal-show");
}

function addWinningTime(time) {
    const item = modalBackground.querySelector(".modal__text-pink");
    item.textContent = time;
}
