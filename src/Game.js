import React, { useState } from "react";
import "./Game.css";
// importing all functions from Gamelogic
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
    // setState allows us to update state dynamically
    // store initial values in the 'board', using whatever is passed in useState(), and setBoard, gets updated dynamically as and when we update it.
  const [board, setBoard] = useState(generateRandom(getEmptyBoard()));

  // check if game has ended
  const checkEndGame = () => {
    if (checkForWin(board)) { // check for win, if value has reached 2048
      console.log("You win!");
    } else if (isDone(board)) {  // check if all the matrix elements is filled
      console.log("Game over!");
    }
  };

  //update board for left press
  const left = () => {
    const newBoard = moveLeft(board);

    // setBoard can either take in object or function.
    setBoard(generateRandom(newBoard)); // generate random value 2 or 4 after executing moveLeft, 
    // setBoard is getting updated with a new board, which has implemented moveLeft function, 
    //and this board is passed into generateRandom, which will generate random values(2/4) 
    //in one of the empty elements of the newBoard matrix.
    // every-time setBoard is updated , board also gets updated globally.
    checkEndGame();   // check if game has ended for each move
    // the board passed in checkEndGame has already been updated with the new board,that we have updated using setBoard()
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
      <div>
    <input onKeyDown={onKeyPress} /> // click here, and use arrow keys
    <div className="matrix">
        {board.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <span key={j}>{col}</span>
            ))}
          </div>
        ))}
      </div>
      </div>
  );
};

export default Game;