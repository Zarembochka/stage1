import { playLevel } from "./gameFunctions";
import { createElement } from "./layout";
import { levelsObject } from "./levels";

export function createLevelList(level) {
    const list = createElement("ul", `${level}__list levels__list`);
    createLevelsListItems(list, level);
    return list;
}

function createLevelsListItems(item, level) {
    const levels = levelsObject[level];
    for (let i = 0; i < levels.length; i += 1) {
        const levelListItem = createElement("li", `${level}__list__item levels__list__item`);
        const btn = createElement("button", "btn btn-nav btn-menuItem", levels[i].title);
        btn.addEventListener("click", () => playLevel(levels[i]));
        levelListItem.append(btn);
        item.append(levelListItem);
    }
}
