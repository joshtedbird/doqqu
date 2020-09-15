import React, {useState} from 'react';
import './gui.css';

function Gui({numPressed, clickReg}){
  const [color, setColor] = useState('gui-idle');

  function handleHover(s) {
    if(s){
      setColor('gui-active');
    }else{
      setColor('gui-idle');
    }
  }

  return(
    <div className = 'game-gui-floater'>
      <div
      className = 'game-gui'
      onMouseEnter = {() => handleHover(1)}
      onMouseLeave = {() => handleHover(0)}
      >
        <Numpad color = {color} pressed = {numPressed}/>

      </div>
    </div>
  );
}

function Numpad({color, pressed, onButtonClick}) {
  function handleClick(event){
    pressed(event.target.id);
  }

  return(
    <div className = 'gui-numpad'>
      <div className = {color + ' numpad-key'} id = {1} onClick = {handleClick}>
      1
      </div>
      <div className = {color + ' numpad-key'} id = {2} onClick = {handleClick}>
      2
      </div>
      <div className = {color + ' numpad-key'} id = {3} onClick = {handleClick}>
      3
      </div>
      <div className = {color + ' numpad-key'} id = {4} onClick = {handleClick}>
      4
      </div>
      <div className = {color + ' numpad-key'} id = {5} onClick = {handleClick}>
      5
      </div>
      <div className = {color + ' numpad-key'} id = {6} onClick = {handleClick}>
      6
      </div>
      <div className = {color + ' numpad-key'} id = {7} onClick = {handleClick}>
      7
      </div>
      <div className = {color + ' numpad-key'} id = {8} onClick = {handleClick}>
      8
      </div>
      <div className = {color + ' numpad-key'} id = {9} onClick = {handleClick}>
      9
      </div>
      <div className = {color + ' numpad-key numpad-key-del'}  id = {0} onClick = {handleClick}>
      del
      </div>
    </div>
  );
}

export default Gui;
