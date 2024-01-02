let container;
let hangman;
let quiz;
let quizQuestion;
let quizAnswer;
let quizCount;
let keyboard;

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

function prepareQuiz() {
    quizQuestion = createElement("div", "quiz__question");
    quiz.append(quizQuestion);
    quizAnswer = createElement("div", "quiz__answer");
    quiz.append(quizAnswer);
    quizCount = createElement("div", "quiz__count");
    quiz.append(quizCount);
    keyboard = createElement("div", "keyboard");
    quiz.append(keyboard);
    keyboard.addEventListener("click", checkKeyDown);
    document.addEventListener("keypress", checkKeyPress);
}

function createKeyboard() {
    const keysCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77];
    for (let i = 0; i <= keysCodes.length - 1; i += 1) {
        const key = createElement("button", "btn keyboard__btn");
        key.textContent = String.fromCharCode(keysCodes[i]);
        key.setAttribute("code", "Key" + String.fromCharCode(keysCodes[i]));
        keyboard.append(key);
    }
}

function prepareToGame() {
    createContainer();
    createHeader();
    createMain();
    prepareQuiz();
    createKeyboard();
}

function checkKeyDown(event) {
    const btn = event.target;
    btn.setAttribute("disabled", true);
}

function checkKeyPress(event) {
    console.log(event);
    const code = event.code;
    const btn = keyboard.querySelector(`[code=${code}]`);
    try {
        btn.setAttribute("disabled", true);
    } catch {}
}

prepareToGame();
