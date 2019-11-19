import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './board';
import {
  CELL_TERRAIN,
  CELL_LIFE,
  CELL_EMPTY,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  INITIAL_LIFE_DENSITY } from './constants';

function App() {

  const [started, setStarted] = useState(false);
  const [cells, setCells] = useState([]);
  const [refresh, setRefresh] = useState(true);


    // build the board
    let c = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
      c.push([]);
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        c[i].push(CELL_EMPTY);
      }
    }

    // Build terrain
    let numRocks = Math.floor(BOARD_HEIGHT * BOARD_WIDTH / 200);
    for (let i = 0; i < numRocks; i++) {
      // Pick size and position
      let diameter = Math.floor(Math.random() * 3) + 1;
      let posX = Math.floor(Math.random() * (BOARD_WIDTH - diameter) + (diameter / 2));
      let posY = Math.floor(Math.random() * (BOARD_HEIGHT - diameter) + (diameter / 2));
      // Place terrain
      c[posX][posY] = CELL_TERRAIN;
      if (diameter > 1) {
        c[posX+1][posY] = CELL_TERRAIN;
        c[posX-1][posY] = CELL_TERRAIN;
        c[posX][posY+1] = CELL_TERRAIN;
        c[posX][posY-1] = CELL_TERRAIN;
      } else if (diameter >= 2) {
        c[posX+2][posY] = CELL_TERRAIN;
        c[posX-2][posY] = CELL_TERRAIN;
        c[posX][posY+2] = CELL_TERRAIN;
        c[posX][posY-2] = CELL_TERRAIN;
        c[posX+1][posY+1] = CELL_TERRAIN;
        c[posX+1][posY-1] = CELL_TERRAIN;
        c[posX-1][posY+1] = CELL_TERRAIN;
        c[posX-1][posY-1] = CELL_TERRAIN;
      }
    }


    // Place initial life
    let i = 0;
    let limit = BOARD_WIDTH * BOARD_HEIGHT * INITIAL_LIFE_DENSITY;
    while (i < limit) {
      let posX = Math.floor(Math.random() * BOARD_WIDTH);
      let posY = Math.floor(Math.random() * BOARD_HEIGHT);
      if (c[posX][posY] !== CELL_TERRAIN && c[posX][posY] !== CELL_LIFE) {
        c[posX][posY] = CELL_LIFE;
        i++;
      }
    }

    console.log(`newcells`, c);
    if (!started) {

        setStarted(true);
        setCells(c);
    }


  useEffect(() => {
    // Set cycle timer
    setTimeout(handleCycle, 200);
  },[cells])

  function handleCycle() {
    let c = [...cells];

    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_WIDTH; y++) {
        let count = countNeighbors(x,y);
        let status = cells[x][y];
        if (status !== CELL_TERRAIN) {
          if (status === CELL_LIFE) {
            // Any live cell with 2-3 neighbors continues to live
            // All other live cells die
            if (count < 2 || count > 3) {
              c[x][y] = CELL_EMPTY;
            }
          } else if (status === CELL_EMPTY) {
            // Any dead cell with 3 live neighbors becomes a live cell
            if (count === 3) {
              c[x][y] = CELL_LIFE;
            }
          }
        }
      }
    }
    setCells(c);
  }

  function countNeighbors(x, y) {
    let count = 0;

    // start at 12 o'clock
    let checkX = x;
    let checkY = y - 1;
    if (checkY >= 0) count += checkCell(checkX, checkY);
    checkX = x + 1;
    if (checkX < BOARD_WIDTH && checkY >= 0) count += checkCell(checkX, checkY);
    checkY = y;
    if (checkX < BOARD_WIDTH) count += checkCell(checkX, checkY);
    checkY = y + 1;
    if (checkX < BOARD_WIDTH && checkY < BOARD_HEIGHT) count += checkCell(checkX, checkY);
    checkX = x;
    if (checkY < BOARD_HEIGHT) count += checkCell(checkX, checkY);
    checkX = x - 1;
    if (checkX >= 0 && checkY < BOARD_HEIGHT) count += checkCell(checkX, checkY);
    checkY = y;
    if (checkX >= 0) count += checkCell(checkX, checkY);
    checkY = y - 1;
    if (checkX >= 0 && checkY >= 0) count += checkCell(checkX, checkY);

    return count;
    }

    // helper function to check a cell
    function checkCell(x,y) {
      return (cells[x][y] === CELL_LIFE) ? 1 : 0;
    }

  return (
    <div className="App">
      <Board width={BOARD_WIDTH} height={BOARD_HEIGHT} cells={cells} />
    </div>
  );
}

export default App;
