import { levelsObject } from "./levels";

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

export function getRandomEasyLevel() {
    const length = levelsObject.easy.length;
    const levelIndex = getRandom(length);
    return levelsObject.easy[levelIndex];
}
