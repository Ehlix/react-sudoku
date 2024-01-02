import {sudokuBlocks} from "./createSudokuGrid.js";

export const validateSudoku = (grid) => {
  const cells = grid.length;
  const block = sudokuBlocks[cells];
  for (let i = 0; i < cells; i++) {
    const row = grid[i];
    if (row.includes(0) || (new Set(row).size < cells)) {
      return false;
    }
    const column = row.reduce((acc, _, index) => {
      acc.push(grid[index][i]);
      return acc;
    }, []);
    if (column.includes(0) || (new Set(column).size < cells)) {
      return false;
    }
  }
  for (let i = 0; i < cells; i += block[0]) {
    for (let j = 0; j < cells; j += block[1]) {
      const blockNums = [];
      for (let k = 0; k < block[0]; k++) {
        const row = i + k;
        const step = j + block[1];
        blockNums.push(...grid[row].slice(j, step));
      }
      if (blockNums.includes(0) || (new Set(blockNums).size < cells)) {
        return false;
      }
    }
  }
  return true;
};