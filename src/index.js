import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './gui.css';
import Grid from './grid.js';
import Gui from './gui.js';
import {solveSudoku} from './sudoku-solver.js';

function Game(){
  const MODE_NORM = 'norm';
  const MODE_CORN = 'corn';
  const MODE_CENT = 'cent';

  const [grid, setGrid] = useState(populateGrid());
  const [activeCell, setActiveCell] = useState(null);
  const [selectToggle, setToggle] = useState(false);
  const [selectToggleHeld, setToggleHeld] = useState(false);
  const [writeMode, setWriteMode] = useState(MODE_NORM);

  function addSelected(i, firstClick){
    setActiveCell(i);
    if(selectToggle){
      let grid_cpy = grid.slice();
      grid_cpy[i].selected = true;
      setGrid(grid_cpy);
    }

    if(firstClick && !selectToggleHeld){
      setGrid(grid.map((cell, index) => ({...cell, selected: index === i})));
    }else if(firstClick && selectToggleHeld){
      let new_grid = grid.slice();
      new_grid[i].selected = true;

      setGrid(new_grid);
    }
  }

  function clicked(){
    if(!selectToggleHeld){
      clearSelection();
    }

    if(activeCell !== null){
      addSelected(activeCell, true);
      setToggle(true);
    }
  }

  function outClick() {
    console.log("we got it");
  }

  function clearSelection(){
    setGrid(grid.map(cell => ({...cell, selected: false})));
  }

  function mouseLift(){
    setToggle(false);
  }

  function gridLeave() {
    setActiveCell(null);
  }

  function setValues(i) {
    let new_grid = [];

    for(let k = 0; k < grid.length; k++){
      new_grid.push(grid[k]);
      if(grid[k].selected && !grid[k].locked){
        //DELETE
        if(!i){
          if(new_grid[k].value){
            new_grid[k].value = null;
          }else{
            new_grid[k].pm_corner = [];
            new_grid[k].pm_center = [];
          }
        }else if(writeMode === MODE_NORM){
          new_grid[k].value = i;
        }else if(writeMode === MODE_CORN){
          if(new_grid[k].pm_corner.includes(i)){
            removeA(new_grid[k].pm_corner, i);
          }else{
            new_grid[k].pm_corner.push(i);
          }

        }else if(writeMode === MODE_CENT){
          if(new_grid[k].pm_center.includes(i)){
            removeA(new_grid[k].pm_center, i);
          }else{
            new_grid[k].pm_center.push(i);
          }
        }
      }
    }

    setGrid(new_grid);
  }

  function keyDown(e){
    let code = e.keyCode;
    switch(code){
      case 91:
        setToggleHeld(true);
        break;

      // 1
      case 49:
        setValues(1);
        break;
      // 2
      case 50:
        setValues(2);
        break;
      // 3
      case 51:
        setValues(3);
        break;
      // 4
      case 52:
        setValues(4);
        break;
      // 5
      case 53:
        setValues(5);
        break;
      // 6
      case 54:
        setValues(6);
        break;
      //7
      case 55:
        setValues(7);
        break;
      //8
      case 56:
        setValues(8);
        break;
      //9
      case 57:
        setValues(9);
        break;

      //delete
      case 8:
        setValues(null);
        break;



      default:
        break;
    }
  }

  function keyUp(e){
    let code = e.keyCode;
    switch(code){
      case 91:
        setToggleHeld(false);
        break;

      default:
        break;
    }
  }

  function numpadPress(i){
    console.log(i);

    if(i === '0'){
      setValues(null);
    }else{
      setValues(i);
    }
  }

  function toggleWriteMode(m){
    setWriteMode(m);
  }

  useEffect(() => {
    // initiate the event handler
    document.addEventListener('mouseup', mouseLift);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);


    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      document.removeEventListener('mouseup', mouseLift);
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    };
  });

  //RENDER
  return(
    <div>
      <div className = 'wrapper'>
        <Timer />
        <Grid
          grid = {grid}
          handleSelect = {addSelected}
          handleMouseDown = {clicked}
          handleMouseUp = {mouseLift}
          gridExit = {gridLeave}
        />
        <Gui
          numPressed = {numpadPress}
          toggleWriteMode = {toggleWriteMode}
          clickReg = {outClick}
        />
      </div>
      <div className = 'click-collector' onMouseDown = {clicked}>
      </div>
    </div>
  );
}

function Timer() {
  const [paused, togglePause] = useState(false);

  return(
    <div className = "grid-header" onClick = {togglePause}>
      12:34
    </div>
  );
}

function populateGrid(){
  let grid_arr = [];

  for(let x = 0; x < 81; x++){
    let new_cell = {
      value: null,
      selected: false,
      pm_corner: [],
      pm_center: [],
      locked: false,
    };
    grid_arr.push(new_cell);
  }

  let test_gen = solveSudoku();

  for(let t = 0; t < test_gen.length; t++){
    if(test_gen[t].value){
      grid_arr[t].value = test_gen[t].value;
    }else{
      grid_arr[t].pm_center = test_gen[t].poss;
    }
    grid_arr[t].locked = test_gen[t].locked;
  }

  return(grid_arr);
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
