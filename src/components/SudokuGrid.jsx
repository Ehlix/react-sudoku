import {createSudokuGrid} from "../utils/createSudokuGrid.js";
import './SudokuGrid.css';


const SudokuGrid = () => {
  const [grid, userGrid] = createSudokuGrid(30);
  console.log(userGrid, grid);
  return (
    <table>
      <tbody>
      {
        userGrid.map((r) => {
          return (
            <tr key={Math.random()}>
              {
                r.map((v) => {
                  return (
                    <td key={Math.random()}>
                      {
                        v
                          ?
                          <div>
                            {v}
                          </div>
                          :
                          <input type="text"/>
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
  );
};

export default SudokuGrid;