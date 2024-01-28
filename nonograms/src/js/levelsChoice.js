import { levelsObject, levelList } from "./levels";

export function getRandom(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomEasyLevel() {
    const length = levelsObject.easy.length;
    const levelIndex = getRandom(length);
    return levelsObject.easy[levelIndex];
}

export function getRandomLevel() {
    const levelIndex = getRandom(levelList.length);
    const level = levelList[levelIndex];
    const gameIndex = getRandom(levelsObject[level].length);
    return levelsObject[level][gameIndex];
}
