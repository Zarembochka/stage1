import { getMatrixFromUser, equalMatrix } from "./matrix";

export function isWin(table, matrix) {
    const userMatrix = getMatrixFromUser(table);
    const isWin = equalMatrix(userMatrix, matrix);
    return isWin;
}
