import quizList from "./quiz.json" assert { type: "json" };

let container;
let hangman;
let hangmanImage;
let quiz;
let quizQuestion;
let quizAnswer;
let quizCount;
let keyboard;
const maxGuessesCount = 6;
let quessesCount;
let secretWord;
let secretWordInDOM;
let modalBackground;
let modal;
let isPlayed;

function createElement(name, classname, text) {
    const newElement = document.createElement(name);
    newElement.className = classname;
    if (text) {
        newElement.textContent = text;
    }
    return newElement;
}

function createContainer() {
    container = createElement("div", "container");
    document.body.append(container);
}

function createHeader() {
    const header = createElement("header", "header");
    const title = createElement("h1", "title", "Hangman game");
    header.prepend(title);
    container.prepend(header);
}

function createHangman() {
    hangman = createElement("div", "hangman");
    hangmanImage = createElement("img", "hangman__img");
    hangman.append(hangmanImage);
}

function createQuiz() {
    quiz = createElement("div", "quiz");
}

function createMain() {
    const main = createElement("main", "main");
    createHangman();
    createQuiz();
    main.append(hangman);
    main.append(quiz);
    container.append(main);
}

function createQuizAnswer() {
    quizAnswer = createElement("ul", "quiz__answer");
    quiz.append(quizAnswer);
}

function createQuizQuestion() {
    quizQuestion = createElement("span", "quiz__text");
    quiz.append(quizQuestion);
}

function createQuizCount() {
    const quizCountText = createElement("span", "quiz__text", "Incorrect guesses: ");
    quizCount = createElement("b", "quiz__text-red");
    quizCountText.append(quizCount);
    quiz.append(quizCountText);
}

function createQuizKeyboard() {
    keyboard = createElement("div", "keyboard");
    quiz.append(keyboard);
    keyboard.addEventListener("click", checkKeyDown);
}

function prepareQuiz() {
    quessesCount = 0;
    createQuizAnswer();
    createQuizQuestion();
    createQuizCount();
    createQuizKeyboard();
    document.addEventListener("keypress", checkKeyPress);
}

function fillQuiz() {
    const quizItem = getQuizItemFromList();
    fillAnswerToQuiz(quizItem.answer);
    fillQuestionToQuiz(quizItem.question);
    fillQuizCount();
}

function getQuizItemFromList() {
    const previousId = getIdFromLS();
    let id = getRandomQuizId();
    while (id === previousId) {
        id = getRandomQuizId();
    }
    saveIdToLS(id);
    return quizList[id];
}

function getRandomQuizId() {
    return Math.floor(Math.random() * quizList.length);
}

function fillQuizCount() {
    quizCount.textContent = `${quessesCount} / ${maxGuessesCount}`;
}

function fillAnswerToQuiz(answer) {
    secretWord = answer;
    console.log(secretWord);
    showAnswer(secretWord);
    secretWordInDOM = quizAnswer.querySelectorAll(".quiz__char");
}

function showAnswer(word) {
    for (let i = 0; i <= word.length - 1; i += 1) {
        const char = createElement("li", "quiz__char");
        quizAnswer.append(char);
    }
}

function fillQuestionToQuiz(question) {
    const questionToShow = `Hint. ${question}`;
    quizQuestion.textContent = questionToShow;
}

function createKeyboard() {
    const keysCodes = [
        81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86,
        66, 78, 77,
    ];
    for (let i = 0; i <= keysCodes.length - 1; i += 1) {
        const key = createElement("button", "btn keyboard__btn");
        key.textContent = String.fromCharCode(keysCodes[i]);
        key.setAttribute("data-code", "Key" + String.fromCharCode(keysCodes[i]));
        keyboard.append(key);
    }
}

function prepareToGame() {
    createContainer();
    createHeader();
    createMain();
    prepareQuiz();
    createKeyboard();
    createModal();
}

function startGame() {
    isPlayed = true;
    quessesCount = 0;
    drawHangman();
    fillQuiz();
}

function drawHangman() {
    hangmanImage.src = `./assets/hangman-${quessesCount}.svg`;
    hangmanImage.alt = `hangman image ${quessesCount}`;
}

function checkKeyDown(event) {
    if (event.target !== keyboard) {
        if (isPlayed) {
            if (quessesCount < 6) {
                const btn = event.target;
                btn.setAttribute("disabled", true);
                checkMatches(btn.textContent);
            }
        }
    }
}

function checkKeyPress(event) {
    if (isPlayed) {
        if (quessesCount < 6) {
            const code = event.code;
            const btn = keyboard.querySelector(`[data-code=${code}]`);
            try {
                if (!btn.getAttribute("disabled")) {
                    btn.setAttribute("disabled", true);
                    checkMatches(btn.textContent);
                }
            } catch {
                return;
            }
        }
    }
}

function replaceNullWithLetter(index, letter) {
    const item = secretWordInDOM[index];
    item.classList.add("quiz__char-noborder");
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
        checkWin();
        return;
    }
    increaseGuessingCount();
}

function increaseGuessingCount() {
    quessesCount += 1;
    fillQuizCount();
    drawHangman();
    if (quessesCount === 6) {
        isPlayed = false;
        showModal(false);
        return;
    }
}

function checkWin() {
    for (let i = 0; i <= secretWordInDOM.length - 1; i += 1) {
        const letter = secretWordInDOM[i].textContent;
        if (!letter) {
            return;
        }
    }
    isPlayed = false;
    showModal(true);
}

function saveIdToLS(id) {
    localStorage.setItem("id_LH", id);
}

function getIdFromLS() {
    return +localStorage.getItem("id_LH");
}

function createModal() {
    modalBackground = createElement("div", "modal__background");
    modal = createElement("div", "modal");
    modalBackground.append(modal);
    document.body.append(modalBackground);
}

function addImageToModal(win) {
    const img = createElement("img", "modal__img");
    img.src = "./assets/lost.svg";
    if (win) {
        img.src = "./assets/win.svg";
    }
    modal.append(img);
}

function addTitleToModal(win) {
    const title = createElement("h2", "modal__title");
    title.textContent = "You lost!";
    if (win) {
        title.textContent = "You win!";
    }
    modal.append(title);
}

function addAnswerToModal() {
    const message = createElement("span", "quiz__text");
    message.textContent = `The correct answer is ${secretWord}`;
    modal.append(message);
}

function addButtonPlayAgain() {
    const btn = createElement("button", "btn btn-play");
    btn.textContent = "Play again";
    modal.append(btn);
    btn.addEventListener("click", startNewGame);
}

function startNewGame() {
    hideModal();
    clearModal();
    clearQuiz();
    removeDisabledAttributeFromKeyboard();
    startGame();
}

function prepareModal(win) {
    addImageToModal(win);
    addTitleToModal(win);
    addAnswerToModal();
    addButtonPlayAgain();
}

function showModal(win) {
    prepareModal(win);
    modalBackground.classList.add("modal-show");
}

function hideModal() {
    modalBackground.classList.remove("modal-show");
}

function clearModal() {
    modal.innerHTML = "";
}

function clearQuiz() {
    quizAnswer.textContent = "";
    quizQuestion.textContent = "";
}

function removeDisabledAttributeFromKeyboard() {
    const disabledKeys = keyboard.querySelectorAll("[disabled=true]");
    for (let i = 0; i < disabledKeys.length; i += 1) {
        disabledKeys[i].removeAttribute("disabled");
    }
}

prepareToGame();
startGame();
