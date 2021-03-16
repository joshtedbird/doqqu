import React, {useState, useEffect, useRef} from 'react';
import './gui.css';
import gui_del from './assets/delete.png';

import gui_undo from './assets/undo.png';
import gui_norm from './assets/gui_norm.svg';
import gui_cent from './assets/gui_cent.svg';
import gui_corn from './assets/gui_corn.svg';

function Gui({numPressed, clickReg, toggleWriteMode, sudokuRestart, undo}){

  return(
    <div className = 'game-gui'>
      <Numpad pressed = {numPressed} undo = {undo}/>
      <WriteToggle toggleMode = {toggleWriteMode}/>
      <Settings pressed = {numPressed} undo = {undo}/>
    </div>
  );
}

function Numpad({pressed, onButtonClick, undo}) {
  function handleClick(event){
    pressed(event.target.id);
  }

  return(
    <div className = 'gui-numpad'>
      <div className = 'numpad-key numpad-key-border' id = {'1'} onClick = {handleClick}>
      1
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'2'} onClick = {handleClick}>
      2
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'3'} onClick = {handleClick}>
      3
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'4'} onClick = {handleClick}>
      4
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'5'} onClick = {handleClick}>
      5
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'6'} onClick = {handleClick}>
      6
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'7'} onClick = {handleClick}>
      7
      </div>
      <div className = 'numpad-key numpad-key-border' id = {'8'} onClick = {handleClick}>
      8
      </div>
      <div className = 'numpad-key' id = {'9'} onClick = {handleClick}>
      9
      </div>
      <div className = 'numpad-key numpad-key-del' id = 'delete' onClick = {handleClick}>
       <img src = {gui_del} alt = "" id = {0} onClick = {handleClick} className = 'img-settings'/>
      </div>
      <div className = 'numpad-key numpad-key-undo' id = {'undo'} onClick = {undo}>
        <img src = {gui_undo} className = 'img-settings'/>
      </div>
    </div>
  );
}

function WriteToggle({toggleMode}){
  const NORM = 'norm';
  const CORN = 'corn';
  const CENT = 'cent';

  const POS_LEFT = ' mode-switch-ind-left';
  const POS_CENTER = ' mode-switch-ind-center';
  const POS_RIGHT = ' mode-switch-ind-right';

  const [ind_pos, changeIndPos] = useState(POS_LEFT);
  const [hover_pos, changeHover] = useState('');

  function handleClick(event){
    let m = event.target.id;

    changeMode(m);
    toggleMode(m);
  }

  function changeMode(m){
    if(m === NORM){
      changeIndPos(POS_LEFT);
    }else if(m === CORN){
      changeIndPos(POS_CENTER);
    }else if(m === CENT){
      changeIndPos(POS_RIGHT);
    }
  }

  function handleHover(e){
    let p = e.target.id;

    changeHover(p);
  }

  function handleExit(e){
    changeHover('');
  }

  function keyDown(e){
    let code = e.keyCode;
     switch(code){
       //Q
       case 81:
         changeMode(NORM);
         toggleMode(NORM);
         break;

       //W
       case 87:
         changeMode(CORN);
         toggleMode(CORN);
         break;

       //E
       case 69:
         changeMode(CENT);
         toggleMode(CENT);
         break;
    }
  }

  useEffect(() => {
    // initiate the event handler
    document.addEventListener('keydown', keyDown);


    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      document.removeEventListener('keydown', keyDown);
    };
  });

  return(
    <div className = 'mode-switch-cont'>
      <div className = {((hover_pos === NORM)? 'mode-switch-btn-hover ':'') + 'mode-switch-btn'}> </div>
      <div className = {((hover_pos === CORN)? 'mode-switch-btn-hover ':'') + 'mode-switch-btn'}> </div>
      <div className = {((hover_pos === CENT)? 'mode-switch-btn-hover ':'') + 'mode-switch-btn'}> </div>
      <div className = "mode-switch-img-cont">
        <div className = {'mode-switch-ind' + ind_pos}> </div>
      </div>
      <div className = "mode-switch-img-cont">
        <img src = {gui_norm} alt = "" className = "mode-switch-img" id = {NORM} onClick = {handleClick} onMouseEnter = {handleHover} onMouseLeave = {handleExit}/>
        <img src = {gui_corn} alt = "" className = "mode-switch-img" id = {CORN} onClick = {handleClick} onMouseEnter = {handleHover} onMouseLeave = {handleExit}/>
        <img src = {gui_cent} alt = "" className = "mode-switch-img" id = {CENT} onClick = {handleClick} onMouseEnter = {handleHover} onMouseLeave = {handleExit}/>
      </div>
    </div>
  );
}

function Settings({pressed, undo}){
  const [checkRestart, changeRestartConfirm] = useState('idle');
  const restartRef = useRef(null);
  useOutsideAlerter(restartRef);

  function handleClick(event){
    pressed(event.target.id);
  }

  function restartClick(){
    if(checkRestart === 'idle'){
      changeRestartConfirm('confirm');
    }else if(checkRestart === 'confirm'){
      changeRestartConfirm('idle');
      // sudokuRestart();
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          changeRestartConfirm('idle');
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [checkRestart]);
  }

  return(
    <div className = 'gui-settings' id = 'flex-settings-mob'>
      <div className = 'settings-btn' id = 'delete'>
       <img src = {gui_del} alt = "" id = {0} onClick = {handleClick} className = 'img-settings'/>
      </div>
      <div className = 'settings-btn' id = 'undo' onClick = {undo}>
        <img src = {gui_undo} className = 'img-settings'/>
      </div>
    </div>
  );
}

export default Gui;
