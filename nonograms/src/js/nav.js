import { createElement } from "./layout";
import { createList } from "./header";
import { levelList } from "./levels";
import { restartGame } from "./gameFunctions";

export function createNavListItems(navList) {
    for (let i = 1; i <= 6; i += 1) {
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
    //restart
    if (index === 2) {
        createBtnRestart(listItem);
        return;
    }
    if (index === 3) {
        //createLevelChoice(listItem);
        listItem.textContent = "Save";
        return;
    }
    if (index === 4) {
        //createLevelChoice(listItem);
        listItem.textContent = "Continue";
        return;
    }
    if (index === 5) {
        //createLevelChoice(listItem);
        listItem.textContent = "Solution";
        return;
    }
    if (index === 6) {
        //createLevelChoice(listItem);
        listItem.textContent = "Settings";
        return;
    }
}

function createLevelChoice(item) {
    const btn = createElement("button", "btn btn-nav btn-level", "Level");
    item.append(btn);
    const list = createList(item, "level__list");
    createLevelListItems(list);
    btn.addEventListener("click", () => showLevelList(list));
}

function createLevelListItems(list) {
    for (let i = 0; i < levelList.length; i += 1) {
        const listItem = createElement("li", "level__list__item");
        const btnLevelChoice = createElement("button", "btn btn-nav btn-levelChoice", levelList[i]);
        listItem.append(btnLevelChoice);
        list.append(listItem);
    }
}

function showLevelList(list) {
    list.classList.toggle("showList");
}

function createBtnRestart(item) {
    const btn = createElement("button", "btn btn-nav btn-restart", "Restart");
    item.append(btn);
    btn.addEventListener("click", restartGame);
}
