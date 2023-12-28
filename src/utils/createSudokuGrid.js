const allowedChars = (grid, rowIndex, collIndex, cells) => {
  const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lib = [0, 0, 0, 3, 3, 3, 6, 6, 6];
  const currCharsRow = grid[rowIndex];
  const currCharsColl = [];
  const currCharsBlock = [];

  for (let i = 0; i < cells; i++) {
    if (i === rowIndex) {
      continue;
    }
    let num = grid[i][collIndex];
    num && currCharsColl.push(num);
  }

  for (let i = lib[rowIndex]; i < (lib[rowIndex] + 3); i++) {
    for (let j = lib[collIndex]; j < (lib[collIndex] + 3); j++) {
      if ((i === rowIndex) && (j === collIndex)) {
        continue;
      }
      let num = grid[i][j];
      num && currCharsBlock.push(num);
    }
  }
  const currChars = Array.from(new Set(currCharsRow.concat(currCharsColl, currCharsBlock)));
  const res = chars.filter((v) => !currChars.includes(v));
  return res.length > 0 ? res : false;
};

const fillRow = (grid, rowIndex, cells) => {
  let rowIsFilled;
  let runningCount = 0;

  const recFill = () => {
    grid[rowIndex] = [];
    for (let i = 0; i < cells; i++) {
      let chars = allowedChars(grid, rowIndex, i, cells);
      if (!chars) {
        return false;
      }
      grid[rowIndex].push(chars.sort(() => Math.random() - 0.5)[0]);
    }
    return true;
  };

  while (!rowIsFilled && (runningCount < 500)) {
    runningCount = runningCount + 1;
    rowIsFilled = recFill();
  }
  return rowIsFilled;
};

const removeSlotsInFilledGrid = (grid, emptySlots) => {
  const lib = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const userGrid = structuredClone(grid);
  while (emptySlots > 0 && emptySlots < 81) {
    const randomRow = lib.sort(() => Math.random() - 0.5)[0];
    const randomCol = lib.sort(() => Math.random() - 0.5)[0];
    if (userGrid[randomRow][randomCol]) {
      emptySlots -= 1;
      userGrid[randomRow][randomCol] = 0;
    }
  }
  return [grid, userGrid];
};

export const createSudokuGrid = (emptySlots = 30) => {
  const cells = 9;
  const grid = Array.from({length: cells}, (_, i) => (
    !i
      ? Array.from({length: cells}, (_, ind) => ind + 1).sort(() => Math.random() - 0.5)
      : []
  ));
  let generateStatus;
  let runningCount = 0;

  const generateFilledGrid = () => {
    for (let i = 1; i < cells; i++) {
      let rowIsFilled = fillRow(grid, i, cells);
      if (!rowIsFilled) {
        return false;
      }
    }
    return true;
  };

  while (!generateStatus && (runningCount < 500)) {
    runningCount = runningCount + 1;
    generateStatus = generateFilledGrid();
  }
  return generateStatus ? removeSlotsInFilledGrid(grid, emptySlots) : 'generate failed';
};