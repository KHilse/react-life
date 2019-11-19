import React from 'react';
import Cell from './cell';
import {
    BOARD_WIDTH,
    BOARD_DISPLAY_HEIGHT,
    BOARD_DISPLAY_WIDTH } from './constants';

const Board = props => {

    // console.log(`board props cells`, props.cells)
    let content;

    let boardStyle = {
        width: BOARD_DISPLAY_WIDTH,
        height: BOARD_DISPLAY_HEIGHT
    }

    let cellsArray = [];
    for (let i = 0; i < props.width; i++) {
        for (let j = 0; j < props.height; j++) {
            (props.cells.length > 0) ? content = props.cells[i][j] : content = 0;
    
            cellsArray.push(<Cell key={(i*BOARD_WIDTH+j).toString()} content={content} size={BOARD_DISPLAY_WIDTH / BOARD_WIDTH} />);
        }
    }

    return (
        <div className="board" style={boardStyle}>
            { cellsArray }            
        </div>
    )
}

export default Board;