export function calculateHints(matrix) {
    const rowHints = getRowsHint(matrix);
    const colHints = getColsHint(matrix);
    const rowHintsCount = getMaxHint(rowHints);
    const colHintsCount = getMaxHint(colHints);
    const rowHintUnify = unifyHints(rowHints, rowHintsCount);
    const colHintUnify = unifyHints(colHints, colHintsCount);
    const result = {
        rowHints: rowHints,
        colHints: colHints,
        rowHintsCount: rowHintsCount,
        colHintsCount: colHintsCount,
        rowHintUnify: rowHintUnify,
        colHintUnify: colHintUnify,
    };
    return result;
}

function getRowsHint(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 1) {
        const row = [];
        let count = 0;
        for (let j = 0; j < arr[i].length; j += 1) {
            if (!arr[i][j] && j && count) {
                row.push(count);
                count = 0;
                continue;
            }
            if (arr[i][j]) {
                count += 1;
            }
        }
        if (count) {
            row.push(count);
        }
        result.push(row);
    }
    return result;
}

function getColsHint(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 1) {
        const row = [];
        let count = 0;
        for (let j = 0; j < arr[i].length; j += 1) {
            if (!arr[j][i] && i && count) {
                row.push(count);
                count = 0;
                continue;
            }
            if (arr[j][i]) {
                count += 1;
            }
        }
        if (count) {
            row.push(count);
        }
        result.push(row);
    }
    return result;
}

function getMaxHint(arr) {
    const result = arr.map((element) => element.length);
    result.sort((a, b) => b - a);
    return result[0];
}

function unifyHints(arr, length) {
    for (let i = 0; i < arr.length; i += 1) {
        const hint = arr[i];
        while (hint.length < length) {
            hint.unshift("");
        }
    }
    return arr;
}
