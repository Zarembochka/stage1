import { createElement } from "./layout";
import { createList } from "./header";
import { levelList } from "./levels";
import { restartGame, saveGame } from "./gameFunctions";
import { isSavedGame } from "./gameOptions";

export function createNavListItems(navList) {
    for (let i = 1; i <= 4; i += 1) {
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
        listItem.textContent = "Solution";
        return;
    }
    //settings
    if (index === 4) {
        //createLevelChoice(listItem);
        listItem.textContent = "Settings";
        return;
    }
    // if (index === 5) {
    //     //createLevelChoice(listItem);
    //     listItem.textContent = "Solution";
    //     return;
    // }
    // if (index === 6) {
    //     //createLevelChoice(listItem);
    //     listItem.textContent = "Settings";
    //     return;
    // }
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
    btn.addEventListener("click", () => showListOptions(list));
}

function createLevelListItems(list) {
    for (let i = 0; i < levelList.length; i += 1) {
        const listItem = createElement("li", "menu__list__item");
        const btnLevelChoice = createElement("button", "btn btn-nav btn-menuItem", levelList[i]);
        listItem.append(btnLevelChoice);
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
    list.append(listItemRestart);
    list.append(listItemSave);
    list.append(listItemContinue);
}

function showListLevel(list) {
    list.classList.toggle("showList__level");
}

export function showListOptions(list) {
    list.classList.toggle("showList__options");
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
    //btn.addEventListener("click", saveGame);
}
