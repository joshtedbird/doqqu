import React from 'react';
import './index.css';

function Cell({cell, mouseEnter, mouseDown}) {
  let cname;
  let cell_val = '';
  let center_val = '';
  let disp_corn_arr = [null, null, null, null, null, null, null, null, null];

  if(cell.selected){
    cname = 'cell-selected';
  }else if(cell.sub_selected){
    cname = 'cell-sub-selected';
  }else{
    cname = 'cell';
  }

  if(cell.locked){
    cname += ' cell-locked';
  }

  if(!cell.value){
    let cen_arr = cell.pm_center;
    let corn_arr = cell.pm_corner;

    for(let i = 0; i < cen_arr.length; i++){
      center_val += String(cen_arr[i]);
    }

    for(let j = 0; j < corn_arr.length; j ++){
      disp_corn_arr[j] = corn_arr[j];
    }
  }else{
    cell_val = String(cell.value);
  }

  return(
    <div className = {cname} onMouseEnter={mouseEnter} onMouseDown = {mouseDown}>
      {cell_val}
      {cell.value? null: <Corners disp_corn_arr = {disp_corn_arr} center_val = {center_val}/>}
    </div>
  );
}

function Corners({disp_corn_arr, center_val}){
  return(
    <div className = 'cell-corners-cont'>
      <div className = 'cell-corner'>{disp_corn_arr[0]}</div>
      <div className = 'cell-corner'>{disp_corn_arr[4]}</div>
      <div className = 'cell-corner'>{disp_corn_arr[1]}</div>
      <div className = 'cell-center'>{center_val}</div>
      <div className = 'cell-corner'>{disp_corn_arr[2]}</div>
      <div className = 'cell-corner'>{disp_corn_arr[5]}</div>
      <div className = 'cell-corner'>{disp_corn_arr[3]}</div>
    </div>
  );
}

export default Cell;
