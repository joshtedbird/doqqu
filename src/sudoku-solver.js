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
  8, 0, 0, 0, 0, 0, 9, 0, 0,
  0, 0, 0, 0, 9, 5, 6, 0, 0,
  7, 0, 1, 0, 6, 0, 0, 0, 0,
  5, 0, 0, 3, 0, 0, 0, 7, 0,
  0, 3, 0, 0, 0, 8, 0, 0, 2,
  0, 0, 0, 0, 0, 4, 0, 3, 0,
  0, 0, 0, 0, 0, 6, 0, 9, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 5,
  1, 0, 8, 4, 0, 0, 0, 0, 0,
];

export function solveSudoku(){
  let sudoku = [];

  function cellCont(v, p, l, hf) {
    this.value = v;
    this.poss = p;
    this.locked = l;
    this.hiddenFamily = hf;
  };

  for(let i = 0; i < sudoku_original.length; i++){
    let c = new cellCont(sudoku_original[i], [], true, []);
    sudoku.push(c);
  }

  // return(solveLayer(sudoku));

  //Format for exporting to Doqqu
  return(formatForExport(sudoku));
}

function solveLayer(s){
  let sudoku = s;
  if(checkSolved(sudoku)){
    return formatForExport(sudoku);
  }else{
    sudoku = findEmpties(sudoku);

    //STEP 1: NAKED SINGLES
    let sns = solveNakedSingles(sudoku);

    if(sns[1]){
      sudoku = sns[0];
      solveLayer(sudoku);
    }else{
      //STEP 2: HIDDEN SINGLES
      let shs = solveHiddenSingles(sudoku);
      if(shs[1]){
        sudoku = shs[0];
        solveLayer(sudoku);
      }else{
        //STEP 3: NAKED PAIRS
        let snp = solveNakedPairs(sudoku);
        if(snp[1]){
          sudoku = snp[0];
          solveLayer(sudoku);
        }
      }
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

function solveHiddenSingles(s){
  let sudoku = s;
  let changed = false;

  for(let i = 0; i < sudoku.length; i++){
    if(sudoku[i].poss){
      //Check box
      let box_neighbours = getBoxNeighbours(i);

      let poss_vals = getNeighbourPossVals(box_neighbours, sudoku);

      let res = checkHS(poss_vals, sudoku, i);
      sudoku = res[0];
      changed = res[1];

      if(changed){
        break;
      }

      //Check row
      let row_num = Math.floor(i / 9);
      let row_s = row_num * 9;
      let row_neighbours = [];
      for(let k = 0; k < 9; k++){
        if(row_s + k !== i){
          row_neighbours.push(row_s + k);
        }
      }

      poss_vals = getNeighbourPossVals(row_neighbours, sudoku);

      res = checkHS(poss_vals, sudoku, i);
      sudoku = res[0];
      changed = res[1];

      if(changed){
        break;
      }

      //Check col
      let col_num = i % 9;
      let col_s = col_num;
      let col_neighbours = [];
      for(let k = 0; k < 9; k++){
        if(col_s + (k * 9) !== i){
          col_neighbours.push(col_s + (k * 9));
        }
      }

      poss_vals = getNeighbourPossVals(col_neighbours, sudoku);

      res = checkHS(poss_vals, sudoku, i);

      sudoku = res[0];
      changed = res[1];
    }
  }
  return([sudoku, changed]);
}

function solveNakedPairs(s){
  let sudoku = s;
  let res = [];
  let changed = false;
  //Check rows
  for(let r = 0; r < 9; r++){
    let start_ind = r * 9;
    let row = [];

    for(let c = 0; c < 9; c++){
      row.push(start_ind + c);
    }

    let found_pairs = findPairs(sudoku, row);
    if(found_pairs){
      res = excludePairs(sudoku, row, found_pairs);
      sudoku = res[0];
      if(res[1]){
        changed = true;
      }
    }
  }

  //Check boxes
  for(let r = 0; r < 9; r++){
    let b = boxes[r];

    let found_pairs = findPairs(sudoku, b);
    if(found_pairs){
      res = excludePairs(sudoku, b, found_pairs);
      sudoku = res[0];
      if(res[1]){
        changed = true;
      }
    }
  }

  //Check cols
  for(let c = 0; c < 9; c++){
    let start_ind = c;
    let col = [];

    for(let r = 0; r < 9; r++){
      col.push(start_ind + 9);
    }

    let found_pairs = findPairs(sudoku, col);
    if(found_pairs){
      res = excludePairs(sudoku, col, found_pairs);
      sudoku = res[0];
      if(res[1]){
        changed = true;
      }
    }
  }

  return([sudoku, changed]);
}

function findPairs(sudoku, container){
  let found_pairs = [];
  for(let i = 0; i < 9; i++){
    //Checking n column in the row
    let ind = container[i];
    let pair_val = [];
    if(!sudoku[ind].value && sudoku[ind].poss.length === 2){
      //Cell has a pair of possibilities
      pair_val = sudoku[ind].poss.slice();
      for(let check = i + 1; check < 9; check++){
        if(sudoku[container[check]].poss.length === 2){
          if(sudoku[container[check]].poss[0] === sudoku[ind].poss[0] && sudoku[container[check]].poss[1] === sudoku[ind].poss[1]){
            found_pairs.push([ind, container[check], sudoku[ind].poss]);
          }
        }
      }
    }
  }
  return(found_pairs);
}

function excludePairs(sudoku, container, found_pairs){
  //[ARRAY OF INDEXES IN GROUP, VALUES OF GROUP]
  let output = [];

  for(let i = 0; i < found_pairs.length; i++){
    let element = found_pairs[i];
    let pair_ind = [element[0], element[1]];
    let pair_vals = element[2];
    output.push([pair_ind, pair_vals]);
  }

  return removeValuesFromGroup(sudoku, container, output);
}

function removeValuesFromGroup(sudoku, group, values){
  //Takes in Sudoku, the indexes of the row/col/box to be affected, and the values of the family
  let changed = false;
  for(let i = 0; i < values.length; i++){
    let family = values[i];
    let fam_inds = family[0];
    let fam_vals = family[1];


    //Replace any possibilities in whole container
    //Go family value by value
    for(let k = 0; k < fam_vals.length; k++){

      let val = fam_vals[k];
      for(let j = 0; j < 9; j++){
        let check_ind = group[j];
        if(!fam_inds.includes(check_ind)){
          let arr_ind = sudoku[check_ind].poss.indexOf(val);
          if(arr_ind > -1){
            console.log(check_ind, sudoku[check_ind].poss, val, arr_ind);
            sudoku[check_ind].poss.splice(arr_ind, 1);
            // changed = true;
          }
        }
      }
    }
  }
  return([sudoku, changed]);
}

function checkHS(poss_vals, sudoku, i){
  let changed = false;
  for(let j = 0; j < sudoku[i].poss.length; j++){
    if(!poss_vals.includes(sudoku[i].poss[j])){
      sudoku[i].value = sudoku[i].poss[j];
      sudoku[i].poss = [];
      changed = true;
      break;
    }
  }
  return([sudoku, changed]);
}

function getNeighbourPossVals(nbors, sudoku){
  let poss_vals = [];
  for(let j = 0; j < nbors.length; j++){
    let check_cell = sudoku[nbors[j]]
    if(check_cell.value){
      continue;
    }else if(check_cell.poss){
      for(let k = 0; k < check_cell.poss.length; k++){
        if(!poss_vals.includes(check_cell.poss[k])){
          poss_vals.push(check_cell.poss[k]);
        }
      }
    }
  }
  return(poss_vals);
}

function getBoxNeighbours(cell){
  let b = true;
  let i = 0;
  let box = null;
  while(b){
    if(boxes[i].includes(cell)){
      box = i;
      b = false;
    }else{
      i++;
    }
  }

  let box_n = [];
  for(let j = 0; j < boxes[box].length; j++){
    if(boxes[box][j] !== cell){
      box_n.push(boxes[box][j]);
    }
  }

  return(box_n);
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
