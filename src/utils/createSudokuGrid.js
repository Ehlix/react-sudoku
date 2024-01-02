export const sudokuBlocks = {
  '6': [2, 3, 17],
  '8': [2, 4, 20],
  '9': [3, 3, 25],
  '10': [2, 5, 30],
  '12': [3, 4, 69],
  '14': [2, 7, 90],
  '15': [3, 5, 120],
  '16': [4, 4, 180],
};

export const createSudokuGrid = (emptySlots = 30, cells = 9) => {
  const block = sudokuBlocks[cells] || [3, 3];
  cells = sudokuBlocks[cells] ? cells : 9;
  const grid = Array.from({length: cells}, () => []);
  let generateStatus;
  let runningCount = 0;

  const generateFilledGrid = () => {
    for (let i = 0; i < cells; i++) {
      let rowIsFilled = fillRow(grid, i, block);
      if (!rowIsFilled) {
        return false;
      }
    }
    return true;
  };
  while (!generateStatus && (runningCount < 200)) {
    runningCount = runningCount + 1;
    generateStatus = generateFilledGrid();
  }
  return generateStatus ? removeSlotsInFilledGrid(grid, emptySlots) : [Array.from({length: 9}, () => Array.from({length: 9}, () => 0))];
};

const generateLibRow = (block, cells) => {
  let sumRow = 0;
  return Array.from({length: cells / block[0]}, (_, i) => {
    sumRow = i ? sumRow + block[0] : 0;
    return Array.from({length: block[0]}, () => sumRow);
  }).flatMap((v) => v);
};

const generateLibCol = (block, col) => {
  let sumCol = 0;
  return Array.from({length: col / block[1]}, (_, i) => {
    sumCol = i ? sumCol + block[1] : 0;
    return Array.from({length: block[1]}, () => sumCol);
  }).flatMap((v) => v);
};

const allowedChars = (grid, rowIndex, colIndex, cells, block) => {
  const chars = Array.from({length: cells}, (_, i) => i + 1);
  const libRow = generateLibRow(block, cells);
  const libCol = generateLibCol(block, cells);

  const currCharsRow = grid[rowIndex];
  const currCharsCol = [];
  const currCharsBlock = [];

  for (let i = 0; i < cells; i++) {
    if (i === rowIndex) {
      continue;
    }
    let num = grid[i][colIndex];
    num && currCharsCol.push(num);
  }

  for (let i = libRow[rowIndex]; i < (libRow[rowIndex] + block[0]); i++) {
    for (let j = libCol[colIndex]; j < (libCol[colIndex] + block[1]); j++) {
      if ((i === rowIndex) && (j === colIndex)) {
        continue;
      }
      let num = grid[i][j];
      num && currCharsBlock.push(num);
    }
  }
  const currChars = Array.from(new Set(currCharsRow.concat(currCharsCol, currCharsBlock)));
  const res = chars.filter((v) => !currChars.includes(v));
  return res.length > 0 ? res : false;
};

const fillRow = (grid, rowIndex, block) => {
  const cells = grid.length;
  let rowIsFilled;
  let runningCount = 0;

  const recFill = () => {
    grid[rowIndex] = [];
    for (let i = 0; i < cells; i++) {
      let chars = allowedChars(grid, rowIndex, i, cells, block);
      if (!chars) {
        return false;
      }
      grid[rowIndex].push(chars.sort(() => Math.random() - 0.5)[0]);
    }
    return true;
  };

  while (!rowIsFilled && (runningCount < 200)) {
    runningCount = runningCount + 1;
    rowIsFilled = recFill();
  }
  return rowIsFilled;
};

const removeSlotsInFilledGrid = (grid, emptySlots) => {
  const cells = grid.length;
  const lib = Array.from({length: cells}, (_, i) => i);
  const userGrid = structuredClone(grid);
  while (emptySlots > 0 && emptySlots < (cells ** 2)) {
    const randomRow = lib.sort(() => Math.random() - 0.5)[0];
    const randomCol = lib.sort(() => Math.random() - 0.5)[0];
    if (userGrid[randomRow][randomCol]) {
      emptySlots -= 1;
      userGrid[randomRow][randomCol] = 0;
    }
  }
  return userGrid;
};

