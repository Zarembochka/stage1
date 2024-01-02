let container;
let hangman;
let quiz;

function createElement(name, classname) {
    const newElement = document.createElement(name);
    newElement.className = classname;
    return newElement;
}

function createContainer() {
    container = createElement("div", "container");
    document.body.append(container);
}

function createHeader() {
    const header = createElement("header", "header");
    const title = createElement("h1", "title");
    title.textContent = "Hangman game";
    header.prepend(title);
    container.prepend(header);
}

function createMain() {
    const main = createElement("main", "main");
    hangman = createElement("div", "hangman");
    quiz = createElement("div", "quiz");
    main.append(hangman);
    main.append(quiz);
    container.append(main);
}

function prepareToGame() {
    createContainer();
    createHeader();
    createMain();
    drawHangman();
    prepareQuiz();
    createKeyboard();
}

prepareToGame();
