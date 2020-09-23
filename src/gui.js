import React, {useState} from 'react';
import './gui.css';
import gui_del from './assets/gui_delete.svg';
import gui_norm from './assets/gui_norm.svg';
import gui_cent from './assets/gui_cent.svg';
import gui_corn from './assets/gui_corn.svg';

function Gui({numPressed, clickReg, toggleWriteMode}){
  const [web, changeDisplay] = useState(true);

  return(
    <div className = {web? 'game-gui-floater': ''}>
      <div
      className = {(web? 'game-gui-layout-web': 'game-gui-layout-mobile') + ' game-gui'}
      >
        <Numpad web = {web} pressed = {numPressed}/>
        <WriteToggle web = {web} toggleMode = {toggleWriteMode}/>
        <div className = 'gui-settings'> {'settings yall'} </div>
      </div>
    </div>
  );
}

function Numpad({web, pressed, onButtonClick}) {
  function handleClick(event){
    pressed(event.target.id);
  }

  return(
    <div className = {(web? 'gui-numpad-web':'gui-numpad-mobile') + ' gui-numpad'}>
      <div className = 'numpad-key' id = {1} onClick = {handleClick}>
      1
      </div>
      <div className = 'numpad-key' id = {2} onClick = {handleClick}>
      2
      </div>
      <div className = 'numpad-key' id = {3} onClick = {handleClick}>
      3
      </div>
      <div className = 'numpad-key' id = {4} onClick = {handleClick}>
      4
      </div>
      <div className = 'numpad-key' id = {5} onClick = {handleClick}>
      5
      </div>
      <div className = 'numpad-key' id = {6} onClick = {handleClick}>
      6
      </div>
      <div className = 'numpad-key' id = {7} onClick = {handleClick}>
      7
      </div>
      <div className = 'numpad-key' id = {8} onClick = {handleClick}>
      8
      </div>
      <div className = 'numpad-key' id = {9} onClick = {handleClick}>
      9
      </div>
      <div className = {(web? 'numpad-key-del':'') + ' numpad-key'}  id = {0} onClick = {handleClick}>
       <img src = {gui_del} alt = "" id = {0} onClick = {handleClick}/>
      </div>
    </div>
  );
}

function WriteToggle({web, toggleMode}){
  const NORM = 'norm';
  const CORN = 'corn';
  const CENT = 'cent';

  const POS_LEFT = ' mode-switch-ind-left';
  const POS_CENTER = ' mode-switch-ind-center';
  const POS_RIGHT = ' mode-switch-ind-right';


  const [norm_style, changeNorm] = useState(true);
  const [corn_style, changeCorn] = useState(false);
  const [cent_style, changeCent] = useState(false);
  const [ind_pos, changeIndPos] = useState(POS_LEFT)
  const [active, changeActive] = useState(false);

  function handleClick(event){
    let m = event.target.id;

    changeMode(m);
    toggleMode(m);
  }

  function changeMode(m){
    if(m === NORM){
      changeNorm(true);
      changeCorn(false);
      changeCent(false);
      changeIndPos(POS_LEFT);
    }else if(m === CORN){
      changeNorm(false);
      changeCorn(true);
      changeCent(false);
      changeIndPos(POS_CENTER);
    }else if(m === CENT){
      changeNorm(false);
      changeCorn(false);
      changeCent(true);
      changeIndPos(POS_RIGHT);
    }
  }

  function handleEnter(){
    changeActive(true);
  }

  function handleLeave(){
    changeActive(false);
  }

  return(
    <div className = 'mode-switch-cont' onMouseOver = {handleEnter} onMouseLeave = {handleLeave}>
      <div className = {(active? 'mode-switch-btn-active':'') + ' mode-switch-btn'} id = {NORM} onClick = {handleClick}> </div>
      <div className = {(active? 'mode-switch-btn-active':'') + ' mode-switch-btn'} id = {CORN} onClick = {handleClick}> </div>
      <div className = {(active? 'mode-switch-btn-active':'') + ' mode-switch-btn'} id = {CENT} onClick = {handleClick}> </div>
      <div className = {'mode-switch-ind' + ind_pos}> </div>
      <div className = "mode-switch-img-cont">
        <img src = {gui_norm} alt = "" className = "mode-switch-img" id = {NORM} onClick = {handleClick}/>
        <img src = {gui_corn} alt = "" className = "mode-switch-img" id = {CORN} onClick = {handleClick}/>
        <img src = {gui_cent} alt = "" className = "mode-switch-img" id = {CENT} onClick = {handleClick}/>
      </div>
    </div>
  );
}

//OLD WRITE TOGGLE COMPONENT
// <div className = {(web? 'mode-switch-cont-web':'mode-switch-cont-mobile') + ' mode-switch-cont'}>
//   <div className = 'mode-switch-btn-cont'>
//     <div className = {(norm_style? ' mode-toggled': '') + ' mode-switch-btn'} >
//
//     </div>
//   </div>
//   <div className = 'mode-switch-btn-cont'>
//     <div className = {(corn_style? ' mode-toggled': '') + ' mode-switch-btn'} >
//
//     </div>
//   </div>
//   <div className = 'mode-switch-btn-cont'>
//     <div className = {(cent_style? ' mode-toggled': '') + ' mode-switch-btn'}>
//
//     </div>
//   </div>
// </div>

// <div className = {'mode-switch-label'}>
//   {'normal'}
// </div>
// <div className = {'mode-switch-label'}>
//   {'corner'}
// </div>
// <div className = {'mode-switch-label'}>
//   {'center'}
// </div>

export default Gui;
