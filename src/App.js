import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
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

  const [cells, setCells] = useState([]);

  useEffect(() => {
    // build the board
    let c = [];
    for (let i = 0; i < BOARD_WIDTH; i++) {
      c.push([]);
      for (let j = 0; j < BOARD_HEIGHT; j++) {
        c[i].push(CELL_EMPTY);
      }
    }
    console.log(`built the board`);
    // Build terrain
    let numRocks = Math.floor(BOARD_HEIGHT * BOARD_WIDTH / 100);
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
      } else if (diameter > 2) {
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
    console.log(`built the terrain`);

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
    console.log(`Life placed`);

    setCells(c);
    console.log(`c`, c);
  }, [])

  return (
    <div className="App">
      <Board width={BOARD_WIDTH} height={BOARD_HEIGHT} cells={cells} />
    </div>
  );
}

export default App;
