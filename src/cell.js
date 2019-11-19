import React from 'react';
import { CELL_TERRAIN, CELL_LIFE, CELL_EMPTY } from './constants';

const Cell = props => {

    console.log(`size: ${props.size}`)
    let cellStyle = {
        width: props.size,
        height: props.size
    }

    console.log(`cell props.content: ${props.content}`);
    let cellClass = '';
    switch (props.content) {
        case CELL_TERRAIN:
                cellClass = 'cell cell-terrain';
            break
        case CELL_LIFE:
                cellClass = 'cell cell-life';
            break
        case CELL_EMPTY:
                cellClass = 'cell cell-empty';
            break
        default:
                cellClass = 'cell cell-empty';
            break
    }

    return (
        <div id={props.id} className={cellClass} style={cellStyle}>
       </div>
    )
}

export default Cell;