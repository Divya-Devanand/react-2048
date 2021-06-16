import React, { useState } from "react";

import {
  getEmptyBoard,
  generateRandom,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isDone,
  checkForWin
} from "./Gamelogic";


const Game = () => {
    // set initial board state to random values
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));

  // check if game has ended
  const checkEndGame = () => {
    if (checkForWin(board)) {
      console.log("You win!");
    } else if (isDone(board)) {
      console.log("Game over!");
    }
  };

  //update board for left press
  const left = () => {
    const newBoard = moveLeft(board);
    setBoard(generateRandom(newBoard)); // generate random value 2 or 4 after executing moveLeft
    checkEndGame();   // check if game has ended for each move
  };

  // update board for right press
  const right = () => {
    const newBoard = moveRight(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };

  // update board for up press
  const up = () => {
    const newBoard = moveUp(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };

  // update board for down press
  const down = () => {
    const newBoard = moveDown(board);
    setBoard(generateRandom(newBoard));
    checkEndGame();
  };

  // execute function for key press event
  const onKeyPress = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;

      default:
    }
    console.log("new array:", board);
  };


  return (
    <input onKeyDown={onKeyPress} /> // input field with onKeyDown event attribute
  );
};

export default Game;