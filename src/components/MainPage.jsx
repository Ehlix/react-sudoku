import SudokuGrid from "./SudokuGrid.jsx";
import './MainPage.css';

const MainPage = () => {
  return (
    <article>
      <header>
        <h1>
          Sudoku
        </h1>
      </header>
      <SudokuGrid/>
    </article>
  );
};

export default MainPage;