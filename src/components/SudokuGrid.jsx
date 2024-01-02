import {createSudokuGrid, sudokuBlocks} from "../utils/createSudokuGrid.js";
import './SudokuGrid.css';
import {useEffect, useState} from "react";
import {validateSudoku} from "../utils/validateSudoku.js";

const SudokuGrid = () => {
  const [deleteSlots, setDeleteSlots] = useState(25);
  const [cells, setCells] = useState(9);
  const [initialGrid, setInitialGrid] = useState(createSudokuGrid(deleteSlots, cells));
  const [grid, setGrid] = useState([]);
  const [isValid, setValid] = useState(null);
  const [rowCol, setRowCol] = useState(null);
  const [allRowAndCol, setAllRowAndCol] = useState(null);

  const generateAllRowsAndColsBorder = () => {
    let rowStart = 0;
    let colStart = 0;
    const rowInc = sudokuBlocks[cells][0];
    const colInc = sudokuBlocks[cells][1];
    const allRows = Array.from({length: cells / rowInc}, () => rowStart += rowInc);
    const allCols = Array.from({length: cells / colInc}, () => colStart += colInc);
    setAllRowAndCol([allRows, allCols]);
  };

  useEffect(() => {
    setGrid(structuredClone(initialGrid));
    generateAllRowsAndColsBorder()
  }, [initialGrid]);

  const createNewGrid = (e) => {
    e.preventDefault();
    setInitialGrid(createSudokuGrid(deleteSlots, cells));
    setValid(null);
    setRowCol(null);
  };

  const deleteSlotsChangeHandler = (e) => {
    e.preventDefault();
    const ds = +e.currentTarget.value;
    isNaN(ds) || setDeleteSlots(e.currentTarget.value);
  };


  const validateGrid = () => {
    const result = validateSudoku(grid);
    result ? setValid('Success') : setValid('Not valid');
  };

  const resetHandler = () => {
    setGrid(structuredClone(initialGrid));
    setValid(null);
    setRowCol(null);
  };

  const setRowColHandler = (e, row, col) => {
    e.preventDefault();
    setRowCol([row, col]);
  };

  const setNumberHandler = (e, number) => {
    e.preventDefault();
    if (!rowCol) {
      return;
    }
    setValid(null);
    grid[rowCol[0]][rowCol[1]] = number;
    setGrid([...grid]);
  };

  const setColHandler = (e, v) => {
    e.preventDefault();
    setCells(v);
    setDeleteSlots(sudokuBlocks[v][2]);
  };

  return (
    <>
      <div className={"buttonsSetCol-block"}>
        {
          Object.keys(sudokuBlocks).map((v) => {
            return (
              <button onClick={(e) => setColHandler(e, v)} key={v}>
                {v}/{v}
              </button>
            );
          })
        }
      </div>
      <div className="buttonsValidate-block">
        <div className='countInput-block'>
          <div>Empty Cells: </div>
          <input className="countInput" type="text" value={deleteSlots}
                 onChange={(e) => deleteSlotsChangeHandler(e)}/>
        </div>
        <button onClick={(e) => createNewGrid(e)}>
          New Sudoku {cells}/{cells}
        </button>
      </div>
      {
        ((grid.length === initialGrid.length) && allRowAndCol) ?
          <>
            <table>
              <tbody>
              {
                initialGrid.map((r, rowIndex) => {
                  const isRowBorder = allRowAndCol[0].includes(rowIndex);
                  return (
                    <tr key={Math.random()}
                        className={isRowBorder ? 'rowBorderTd' : ''}>
                      {
                        r.map((v, colIndex) => {
                          const isCurrent = rowCol && (rowIndex === rowCol[0]) && (colIndex === rowCol[1]);
                          const isColBorder = allRowAndCol[1].includes(colIndex);
                          return (
                            <td key={Math.random()}
                                className={isColBorder ? 'colBorderTd' : ''}>
                              {
                                v
                                  ? (
                                    <div className="cell">
                                      {v}
                                    </div>
                                  )
                                  : (
                                    <button
                                      className={'cellButton ' + (isCurrent ? ' currentCell' : '')}
                                      onClick={(e) => setRowColHandler(e, rowIndex, colIndex)}>
                                      {grid[rowIndex][colIndex] || ''}
                                    </button>
                                  )
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
            <div className={'inputNumbers-block'}>
              {
                grid && Array.from({length: grid.length}, (_, i) => i + 1).map(v => {
                  return (
                    <button key={v}
                            disabled={!rowCol}
                            onClick={(e) => setNumberHandler(e, v)}>
                      {v}
                    </button>
                  );
                })
              }
            </div>
            <div className="buttonsValidate-block">
              <button onClick={validateGrid}>
                Validate
              </button>
              <button onClick={resetHandler}>
                Reset
              </button>
            </div>
            {
              isValid
                ?
                <div>
                  {isValid}
                </div>
                :
                <div className="cover">
                </div>
            }
          </>
          :
          <div></div>
      }
    </>
  );
};

export default SudokuGrid;