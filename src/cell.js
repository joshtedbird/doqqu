import React from 'react';
import './index.css';

function Cell({cell, mouseEnter, mouseDown}) {
  let cname;
  let cell_val = '';

  if(cell.selected){
    cname = 'cell-selected';
  }else{
    cname = 'cell';
  }

  if(cell.locked){
    cname += ' cell-locked';
  }

  if(!cell.value){
    cname += ' cell-text-center';

    let cen_arr = cell.pm_center;
    for(let i = 0; i < cen_arr.length; i++){
      cell_val += String(cen_arr[i]);
    }
  }else{
    cell_val = String(cell.value);
  }

  return(
    <div className = {cname} onMouseEnter={mouseEnter} onMouseDown = {mouseDown}>
      {cell_val}
    </div>
  );
}

export default Cell;
