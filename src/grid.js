import React from 'react';
import './index.css';
import Cell from './cell.js';

class Grid extends React.Component{
  render(){
    return(
      <div className = 'grid-container' onMouseLeave = {this.props.gridExit}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
          i => (<div key = {i} className = 'sub-container'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
              j => <Cell
                key = {(9 * i) + j}
                cell = {this.props.grid[(9*i)+j]}
                mouseEnter = {() => this.props.handleSelect((9*i)+j)}
                mouseDown = {() => this.props.handleMouseDown()}
                />
            )}
          </div>)
        )}
      </div>
    );
  }
}

export default Grid;
