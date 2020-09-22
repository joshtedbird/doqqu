import React, {useState} from 'react';
import './gui.css';
import gui_del from './assets/gui_delete.svg';
import gui_norm from './assets/gui_norm.svg';
import gui_cent from './assets/gui_cent.svg';
import gui_corn from './assets/gui_corn.svg';

function Gui({numPressed, clickReg, toggleWriteMode}){
  const [web, changeDisplay] = useState(false);

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

  const [norm_style, changeNorm] = useState(true);
  const [corn_style, changeCorn] = useState(false);
  const [cent_style, changeCent] = useState(false);

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
    }else if(m === CORN){
      changeNorm(false);
      changeCorn(true);
      changeCent(false);
    }else if(m === CENT){
      changeNorm(false);
      changeCorn(false);
      changeCent(true);
    }
  }

  return(
    <div className = {(web? 'mode-switch-cont-web':'mode-switch-cont-mobile') + ' mode-switch-cont'}>
      <div className = 'mode-switch-btn-cont'>
        <div className = {(norm_style? ' mode-toggled': '') + ' mode-switch-btn'} >
          <img src = {gui_norm} alt = "" id = {NORM} onClick = {handleClick}/>
        </div>
      </div>
      <div className = 'mode-switch-btn-cont'>
        <div className = {(corn_style? ' mode-toggled': '') + ' mode-switch-btn'} >
          <img src = {gui_corn} alt = "" id = {CORN} onClick = {handleClick}/>
        </div>
      </div>
      <div className = 'mode-switch-btn-cont'>
        <div className = {(cent_style? ' mode-toggled': '') + ' mode-switch-btn'}>
          <img src = {gui_cent} alt = "" id = {CENT} onClick = {handleClick}/>
        </div>
      </div>
      <div className = {'mode-switch-label'}>
        {'normal'}
      </div>
      <div className = {'mode-switch-label'}>
        {'corner'}
      </div>
      <div className = {'mode-switch-label'}>
        {'center'}
      </div>
    </div>
  );
}

export default Gui;
