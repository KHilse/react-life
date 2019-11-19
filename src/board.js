import React from 'react';
import Cell from './cell';

const Board = props => {

    let cellsArray = [];
    for (let i = 0; i < props.width; i++) {
        for (let j = 0; j < props.height; j++) {
            cellsArray.push(props.cells[i][j]);
        }
    }

    return (
        <div>
            { cellsArray }
            
        </div>
    )
}

export default Board;