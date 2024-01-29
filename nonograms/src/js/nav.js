import { createElement } from "./layout";
import { createList } from "./header";
import { levelList } from "./levels";
import { restartGame, saveGame, showSolution } from "./gameFunctions";
import { isSavedGame, continueGame, randomGame } from "./gameOptions";
import { createLevelList } from "./levelsList";
import { soundsOnOff } from "./music";

export function createNavListItems(navList) {
    for (let i = 1; i <= 5; i += 1) {
        const listItem = createElement("li", "nav__list__item");
        fillNavListElement(listItem, i);
        navList.append(listItem);
    }
}

function fillNavListElement(listItem, index) {
    //level
    if (index === 1) {
        createLevelChoice(listItem);
        return;
    }
    //game options
    if (index === 2) {
        //createBtnRestart(listItem);
        createGameOptions(listItem);
        return;
    }
    //solution
    if (index === 3) {
        createBtnSolution(listItem);
        return;
    }
    //high score
    if (index === 4) {
        listItem.textContent = "Winners";
        return;
    }
    //settings
    if (index === 5) {
        createGameSettings(listItem);
        return;
    }
}

function createLevelChoice(item) {
    const btn = createElement("button", "btn btn-nav btn-menu btn-level", "Level");
    item.append(btn);
    const list = createList(item, "menu__list");
    createLevelListItems(list);
    btn.addEventListener("click", () => showListLevel(list));
}

function createGameOptions(item) {
    const btn = createElement("button", "btn btn-nav btn-menu btn-gameOptions", "Options");
    item.append(btn);
    const list = createList(item, "menu__list");
    createGameOptionsItems(list);
    btn.addEventListener("click", () => showListLevel(list));
}

function createGameSettings(item) {
    const btn = createElement("button", "btn btn-nav btn-menu btn-gameSettings", "Settings");
    item.append(btn);
    const list = createList(item, "menu__list");
    createGameSettingsItems(list);
    btn.addEventListener("click", () => showListLevel(list));
}

function createBtnSolution(item) {
    const btn = createElement("button", "btn btn-nav btn-menu btn-solution", "Solution");
    item.append(btn);
    btn.addEventListener("click", showSolution);
}

function createLevelListItems(list) {
    for (let i = 0; i < levelList.length; i += 1) {
        const listItem = createElement("li", "menu__list__item");
        const btnLevelChoice = createElement("button", "btn btn-nav btn-menuItem", levelList[i]);
        btnLevelChoice.addEventListener("click", showLevelsToChoice);
        const levelListChoice = createLevelList(levelList[i]);
        listItem.append(btnLevelChoice);
        listItem.append(levelListChoice);
        list.append(listItem);
    }
}

function createGameOptionsItems(list) {
    const listItemRestart = createElement("li", "menu__list__item");
    createBtnRestart(listItemRestart);
    const listItemSave = createElement("li", "menu__list__item");
    createBtnSave(listItemSave);
    const listItemContinue = createElement("li", "menu__list__item");
    createBtnContinue(listItemContinue);
    const listItemRandom = createElement("li", "menu__list__item");
    createBtnRandom(listItemRandom);
    list.append(listItemRestart);
    list.append(listItemSave);
    list.append(listItemContinue);
    list.append(listItemRandom);
}

function createGameSettingsItems(list) {
    const listItemSound = createElement("li", "menu__list__item");
    createBtnSound(listItemSound);
    const listItemTheme = createElement("li", "menu__list__item");
    createBtnTheme(listItemTheme);
    list.append(listItemSound);
    list.append(listItemTheme);
}

function showLevelsToChoice(event) {
    const menu = event.target.nextElementSibling;
    showListLevel(menu);
}

export function showListLevel(list) {
    list.classList.add("showList__level");
}

function hideListLevel(list) {
    list.classList.remove("showList__level");
}

export function hideOptionsList(item) {
    const menuList = item.closest(".menu__list");
    hideListLevel(menuList);
}

export function hideMenuLists(item) {
    const levelList = item.closest(".levels__list");
    hideListLevel(levelList);
    const menuList = item.closest(".menu__list");
    hideListLevel(menuList);
}

function createBtnRestart(item) {
    const btn = createElement("button", "btn btn-nav btn-menuItem btn-restart", "Restart");
    item.append(btn);
    btn.addEventListener("click", restartGame);
}

function createBtnSave(item) {
    const btn = createElement("button", "btn btn-nav btn-menuItem btn-save", "Save");
    item.append(btn);
    btn.addEventListener("click", saveGame);
}

function createBtnContinue(item) {
    const btn = createElement("button", "btn btn-nav btn-menuItem btn-continue", "Continue");
    if (!isSavedGame()) {
        btn.setAttribute("disabled", true);
    }
    item.append(btn);
    btn.addEventListener("click", continueGame);
}

function createBtnRandom(item) {
    const btn = createElement("button", "btn btn-nav btn-menuItem btn-random", "Random");
    item.append(btn);
    btn.addEventListener("click", randomGame);
}

function createBtnSound(item) {
    const btn = createElement("button", "btn btn-nav btn-menuItem btn-sound", "Sounds off");
    item.append(btn);
    btn.addEventListener("click", () => soundsOnOff(btn));
}

function createBtnTheme(item) {
    const btn = createElement("button", "btn btn-nav btn-menuItem btn-theme", "Dark theme");
    item.append(btn);
    //btn.addEventListener("click", restartGame);
}

export function disableBtnSave() {
    const btn = document.querySelector(".btn-save");
    btn.setAttribute("disabled", true);
}

export function enableBtnSave() {
    const btn = document.querySelector(".btn-save");
    btn.removeAttribute("disabled");
}
