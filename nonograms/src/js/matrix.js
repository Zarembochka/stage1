export function getMatrixFromUser(table) {
    const matrix = [];
    const rows = table.querySelectorAll(".game__row");
    for (let row of rows) {
        const matrixRow = [];
        const cells = row.querySelectorAll(".game__cell");
        for (let cell of cells) {
            matrixRow.push(+cell.classList.contains("color"));
        }
        matrix.push(matrixRow);
    }
    return matrix;
}

export function getMatrixUserSolution(table) {
    const matrix = [];
    const rows = table.querySelectorAll(".game__row");
    for (let row of rows) {
        const matrixRow = [];
        const cells = row.querySelectorAll(".game__cell");
        for (let cell of cells) {
            let value = 0;
            if (cell.classList.contains("cross")) {
                value = 2;
            }
            if (cell.classList.contains("color")) {
                value = 1;
            }
            matrixRow.push(value);
        }
        matrix.push(matrixRow);
    }
    return matrix;
}

export function equalMatrix(userMatrix, matrix) {
    for (let i = 0; i < userMatrix.length; i += 1) {
        for (let j = 0; j < userMatrix.length; j += 1) {
            if (userMatrix[i][j] !== matrix[i][j]) {
                return false;
            }
        }
    }
    return true;
}
