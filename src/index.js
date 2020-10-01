import React, {useState, useEffect, useCallback} from 'react';
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
  const [paused, togglePaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [interval, doInterval] = useState();

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
      highlightOtherNums(activeCell);
      addSelected(activeCell, true);

      setToggle(true);
    }
  }

  function highlightOtherNums(c) {
    if(grid[c].value){
      let v = grid[c].value;
      let grid_cpy = grid.slice();
      for(let i = 0; i < grid.length; i++){
        if(grid[i].value === v && (i !== c)){
          grid_cpy[i].sub_selected = true;
        }
      }
      setGrid(grid_cpy);
    }else{
      return;
    }
  }

  function clearSelection(){
    let grid_cpy = grid.slice();

    for(let i = 0; i < grid_cpy.length; i++){
      grid_cpy[i].selected = false;
      grid_cpy[i].sub_selected = false;
    }
    setGrid(grid_cpy);
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
    let n = parseInt(i);
    if(n === 0){
      setValues(null);
    }else{
      setValues(n);
    }
  }

  function toggleWriteMode(m){
    setWriteMode(m);
  }

  function sudokuRestart(){
    let new_grid = [];

    for(let k = 0; k < grid.length; k++){
      new_grid.push(grid[k]);
      if(grid[k].locked === false){
        new_grid[k].value = null;
        new_grid[k].pm_corner = [];
        new_grid[k].pm_center = [];
      }
    }

    clearSelection();
    setGrid(new_grid);

    setSeconds(0);
    togglePaused(false);
  }

  function handlePause(){
    if(paused){
      togglePaused(false);
    }else{
      togglePaused(true);
    }
  }

  useEffect(() => {
    if(paused){
      clearInterval(interval);
      doInterval(undefined);
    }else{
      doInterval(setInterval(tick, 1000));
    }
  }, [paused]);

  function tick() {
      setSeconds((prevSeconds) => prevSeconds + 1);
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
    <div className = 'window-cont'>
      <div className = 'wrapper'>
        <Timer pause = {handlePause} seconds = {seconds}/>
        <Grid
          grid = {grid}
          handleSelect = {addSelected}
          handleMouseDown = {clicked}
          handleMouseUp = {mouseLift}
          gridExit = {gridLeave}
          paused = {paused}
        />
        <Gui
          numPressed = {numpadPress}
          toggleWriteMode = {toggleWriteMode}
          sudokuRestart = {sudokuRestart}
        />
      </div>
      <div className = 'click-collector' onMouseDown = {clicked}>
      </div>
    </div>
  );
}

function Timer({seconds, pause}) {
  let disp_seconds = seconds % 60;
  let minutes = Math.floor(seconds / 60);

  const duration = minutes + ':' + (disp_seconds < 10 ? '0' + disp_seconds: disp_seconds);
  return(
    <div className = "grid-header" onClick = {pause}>
      {duration}
    </div>
  );
}

function populateGrid(){
  let grid_arr = [];

  for(let x = 0; x < 81; x++){
    let new_cell = {
      value: null,
      selected: false,
      sub_highlight: false,
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
