const sudoku_original = [
  [8, 0, 0, 0, 0, 0, 9, 0, 0],
  [0, 0, 0, 0, 9, 5, 6, 0, 0],
  [7, 0, 1, 0, 6, 0, 0, 0, 0],
  [5, 0, 0, 3, 0, 0, 0, 7, 0],
  [0, 3, 0, 0, 0, 8, 0, 0, 2],
  [0, 0, 0, 0, 0, 4, 0, 3, 0],
  [0, 0, 0, 0, 0, 6, 0, 9, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 5],
  [1, 0, 8, 4, 0, 0, 0, 0, 0]
];

let sudoku = genSudoku(sudoku_original);

function solveSudoku(){
  //0: Evaluate cells
}

function cell(v, p, hf, l) {
  this.value = v;
  this.poss = p;
  this.hiddenFamily = hf;
  this.locked = l;
};

solveSudoku();
