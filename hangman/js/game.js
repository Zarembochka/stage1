import { etaps } from "./etaps.js";

let container;
let hangman;
let quiz;
let quizQuestion;
let quizAnswer;
let quizCount;
let keyboard;
const maxGuessesCount = 6;
let quessesCount;
let secretWord;
let secretWordInDOM;

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
    quessesCount = 0;
    quizAnswer = createElement("ul", "quiz__answer");
    quiz.append(quizAnswer);
    quizQuestion = createElement("span", "quiz__text");
    quiz.append(quizQuestion);
    quizCount = createElement("span", "quiz__text");
    quiz.append(quizCount);
    keyboard = createElement("div", "keyboard");
    quiz.append(keyboard);
    keyboard.addEventListener("click", checkKeyDown);
    document.addEventListener("keypress", checkKeyPress);
}

function fillQuiz() {
    fillAnswerToQuiz();
    fillQuestionToQuiz("An animal that lives in the sea");
    fillQuizCount();
}

function fillQuizCount() {
    quizCount.textContent = `Incorrect guesses: ${quessesCount}/${maxGuessesCount}`;
}

function fillAnswerToQuiz() {
    secretWord = "Krokodyl";
    console.log(secretWord);
    showAnswer(secretWord);
    secretWordInDOM = quizAnswer.querySelectorAll(".quiz__char");
}

function showAnswer(word) {
    for (let i = 0; i <= word.length; i += 1) {
        const char = createElement("li", "quiz__char");
        quizAnswer.append(char);
    }
}

function fillQuestionToQuiz(question) {
    const questionToShow = `Hint. ${question}`;
    quizQuestion.textContent = questionToShow;
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
    drawHangman();
}

function startGame() {
    quessesCount = 0;
    fillQuiz();
}

function drawHangman() {
    hangman.innerHTML = etaps[quessesCount];
}

function checkKeyDown(event) {
    const btn = event.target;
    btn.setAttribute("disabled", true);
    checkMatches(btn.textContent);
}

function checkKeyPress(event) {
    console.log(event);
    const code = event.code;
    const btn = keyboard.querySelector(`[code=${code}]`);
    try {
        if (!btn.getAttribute("disabled")) {
            btn.setAttribute("disabled", true);
            checkMatches(btn.textContent);
        }
    } catch {}
}

function replaceNullWithLetter(index, letter) {
    const item = secretWordInDOM[index];
    item.textContent = letter;
}

function showLettersInSecretWord(char) {
    for (let i = 0; i <= secretWord.length - 1; i += 1) {
        const letter = secretWord[i].toUpperCase();
        if (letter === char) {
            replaceNullWithLetter(i, char);
        }
    }
}

function checkMatchesInSecretWord(char) {
    return secretWord.toUpperCase().includes(char);
}

function checkMatches(char) {
    if (checkMatchesInSecretWord(char)) {
        showLettersInSecretWord(char);
        return;
    }
    increaseGuessingCount();
}

function increaseGuessingCount() {
    quessesCount += 1;
    fillQuizCount();
    drawHangman();
}

prepareToGame();
startGame();
