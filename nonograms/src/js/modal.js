import { createElement } from "./layout";
import { clearGameField } from "./gameField";

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
    //title.textContent = "Congratulations!";
    modal.append(title);
}

function addTextToModal(modal) {
    const paragraph = createElement("p", "modal__text");
    const text = createElement("pre", "modal__text");
    text.innerHTML = `Great!
    You have solved
        the nonogram
            in <i class="modal__text-italic"></i> seconds!`;
    paragraph.append(text);
    modal.append(paragraph);
}

function addButtonPlayAgain(modal) {
    const btn = createElement("button", "btn btn-play");
    btn.textContent = "Play again";
    modal.append(btn);
    btn.addEventListener("click", startNewGame);
}

export function showModal() {
    //prepareModal(win);
    modalBackground.classList.add("modal-show");
}

function startNewGame() {
    hideModal();
    clearGameField();
}

function hideModal() {
    modalBackground.classList.remove("modal-show");
}

// function clearModal() {
//     modal.innerHTML = "";
// }
