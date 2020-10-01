import React from 'react';
import './index.css';
import Cell from './cell.js';

function Grid({paused, handleSelect, handleMouseDown, grid, gridExit}){
  return(
    <div className = 'grid-container' onMouseLeave = {gridExit}>
      <Boxes handleSelect = {handleSelect}
             handleMouseDown = {handleMouseDown}
             grid = {grid}
      />
      {paused? <PausePlate />:''}
    </div>
  );
}

function Boxes({handleSelect, handleMouseDown, grid}) {
  return(
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
      i => (<div key = {i} className = 'sub-container'>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
          j => <Cell
            key = {(9 * i) + j}
            cell = {grid[(9*i)+j]}
            mouseEnter = {() => handleSelect((9*i)+j)}
            mouseDown = {handleMouseDown}
            />)}
          </div>
      )
    )
  );
}

function PausePlate() {
  return(
    <div className = 'pause-plate'>
      {'Press the timer to continue playing'}
    </div>
  );
}

export default Grid;
