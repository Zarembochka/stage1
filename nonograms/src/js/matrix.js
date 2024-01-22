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
