import { createElement } from "./layout";
import { calculateHints } from "./hints";
import { addGameFunctionToTable } from "./gameFunctions";

export function createGameField(item, matrix) {
    const hints = calculateHints(matrix);
    const table = createEmptyTable();
    fillTableWithHints(table, hints, matrix.length);
    const lastCell = getLastCell(table);
    const tableGame = createTableGame(matrix.length);
    lastCell.append(tableGame);
    addGameFunctionToTable(tableGame);
    item.append(table);
}

function createEmptyTable() {
    const table = createElement("table", "nonograms");
    for (let i = 0; i < 2; i += 1) {
        const tr = createElement("tr", "nonograms__row");
        for (let j = 0; j < 2; j += 1) {
            const td = createElement("td", "nonogram__cell");
            tr.append(td);
        }
        table.append(tr);
    }
    return table;
}

function fillTableWithHints(table, hints, length) {
    const cellToColsHints = getCellToColsHints(table);
    fillTableWithColsHints(cellToColsHints, hints, length);
    const cellToRowsHints = getCellToRowsHints(table);
    fillTableWithRowsHints(cellToRowsHints, hints, length);
}

function getCellToColsHints(table) {
    const firstRow = table.firstChild;
    return firstRow.lastChild;
}

function getCellToRowsHints(table) {
    const lastRow = table.lastChild;
    return lastRow.firstChild;
}

function fillTableWithColsHints(cell, hints, length) {
    const table = createElement("table", "hints__cols");
    for (let i = 0; i < hints.colHintsCount; i += 1) {
        const tr = createElement("tr", "hints__cols-row");
        for (let j = 0; j < length; j += 1) {
            const td = createElement("td", "hints__cell", hints.colHintUnify[j][i]);
            tr.append(td);
        }
        table.append(tr);
    }
    cell.append(table);
}

function fillTableWithRowsHints(cell, hints, length) {
    const table = createElement("table", "hints__rows");
    for (let i = 0; i < length; i += 1) {
        const tr = createElement("tr", "hints__rows-row");
        for (let j = 0; j < hints.rowHintsCount; j += 1) {
            const td = createElement("td", "hints__cell", hints.rowHintUnify[i][j]);
            tr.append(td);
        }
        table.append(tr);
    }
    cell.append(table);
}

function getLastCell(table) {
    const lastRow = table.lastChild;
    return lastRow.lastChild;
}

function createTableGame(length) {
    const table = createElement("table", "game");
    const rowsCount = length;
    const colsCount = length;
    for (let i = 0; i < rowsCount; i += 1) {
        const tr = createElement("tr", "game__row");
        tr.setAttribute("data-row", i);
        for (let j = 0; j < colsCount; j += 1) {
            const td = createElement("td", "game__cell");
            td.setAttribute("data-col", j);
            tr.append(td);
        }
        table.append(tr);
    }
    return table;
}
