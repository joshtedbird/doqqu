const b0 = [0, 1, 2,
            9, 10, 11,
            18, 19, 20];
const b1 = [3, 4, 5,
            12, 13, 14,
            21, 22, 23];
const b2 = [6, 7, 8,
            15, 16, 17,
            24, 25, 26];
const b3 = [27, 28, 29,
            36, 37, 38,
            45, 46, 47];
const b4 = [30, 31, 32,
            39, 40, 41,
            48, 49, 50];
const b5 = [33, 34, 35,
            42, 43, 44,
            51, 52, 53];
const b6 = [54, 55, 56,
            63, 64, 65,
            72, 73, 74];
const b7 = [57, 58, 59,
            66, 67, 68,
            75, 76, 77];
const b8 = [60, 61, 62,
            69, 70, 71,
            78, 79, 80];

const boxes = [b0, b1, b2, b3, b4, b5, b6, b7, b8];

const sudoku_original = [
  0, 0, 0, 0, 0, 9, 6, 0, 3,
  0, 0, 0, 0, 0, 0, 9, 0, 0,
  6, 0, 0, 8, 0, 1, 0, 5, 7,
  9, 0, 6, 0, 1, 0, 3, 0, 8,
  3, 4, 0, 9, 2, 0, 0, 0, 0,
  0, 5, 0, 0, 6, 0, 0, 0, 0,
  4, 6, 0, 0, 0, 0, 0, 0, 0,
  2, 8, 0, 3, 0, 0, 0, 4, 0,
  0, 0, 5, 0, 0, 4, 1, 0, 6,
];

export function solveSudoku(){
  let sudoku = [];

  function cellCont(v, p, l) {
    this.value = v;
    this.poss = p;
    this.locked = l;
  };

  for(let i = 0; i < sudoku_original.length; i++){
    let c = new cellCont(sudoku_original[i], [], true);
    sudoku.push(c);
  }

  // return(solveLayer(sudoku));
  return(formatForExport(sudoku));
}

function solveLayer(s){
  let sudoku = s;
  if(checkSolved(sudoku)){
    return formatForExport(sudoku);
  }else{
    sudoku = findEmpties(sudoku);

    let sns = solveNakedSingles(sudoku);

    if(sns[1]){
      sudoku = sns[0];
      solveLayer(sudoku);
    }
  }
  return(formatForExport(sudoku));
}

function findEmpties(s){
  let sudoku = s;
  //Check each cell in the sudoku
  for(let cell_index = 0; cell_index < sudoku.length; cell_index ++){
    //Check if cell is empty
    if(!sudoku[cell_index].value){
      //Find cell indexes of cells in corresponding row, column and box
      let row_inds = [];
      let col_inds = [];
      let box_inds = [];

      //create set of impossible numbers
      let visible_nums = new Set();

      //find box
      for(let box_n = 0; box_n < boxes.length; box_n ++){
        for(let b = 0; b < boxes[box_n].length; b ++){
          if(boxes[box_n][b] === cell_index){
            box_inds = boxes[box_n];
            break;
          }
        }
      }

      for(let v = 0; v < box_inds.length; v++){
        visible_nums.add(sudoku[box_inds[v]].value);
      }

      //find row
      let row_num = Math.floor(cell_index / 9);
      for(let r_val = 0; r_val < 9; r_val ++){
        row_inds.push((row_num * 9) + r_val);
        visible_nums.add(sudoku[(row_num * 9) + r_val].value);
      }

      //find col
      let col_num = cell_index % 9;
      for(let c_val = 0; c_val < 9; c_val ++){
        col_inds.push((c_val * 9) + col_num);
        visible_nums.add(sudoku[(c_val * 9) + col_num].value);
      }

      sudoku[cell_index].poss = [];

      for(let n = 1; n < 10; n++){
        if(!visible_nums.has(n)){
          sudoku[cell_index].poss.push(n);
        }
      }
    }
  }
  return sudoku;
}

function solveNakedSingles(s){
  let sudoku = s;
  let changed = false;

  for(let i = 0; i < sudoku.length; i++){
    if(sudoku[i].poss){
      if(sudoku[i].poss.length === 1){
        sudoku[i].value = sudoku[i].poss[0];
        sudoku[i].poss = [];
        changed = true;
      }
    }
  }

  return([sudoku, changed]);
}

function formatForExport(sudoku) {
  let sudoku_out = [];

  function cellCont(v, p, l) {
    this.value = v;
    this.poss = p;
    this.locked = l;
  };

  for(let i = 0; i < boxes.length; i++){
    for(let j = 0; j < boxes[i].length; j++){
      let c = new cellCont(sudoku[boxes[i][j]].value, sudoku[boxes[i][j]].poss, false);
      if(sudoku_original[boxes[i][j]]){
        c.locked = true;
      }
      sudoku_out.push(c);
    }
  }

  return sudoku_out;
}

function checkSolved(sudoku) {
  for(let i = 0; i < sudoku.length; i++){
    if(sudoku[i].value === 0){
      return(false);
    }
  }
  return(true);
}
