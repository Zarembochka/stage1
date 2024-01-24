import { levelEasyList } from "./levels";

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomEasyLevel() {
    const length = levelEasyList.length;
    const levelIndex = getRandom(length);
    return levelEasyList[levelIndex];
}
