// initialise an empty board
export const getEmptyBoard = () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  //check if matrix has a value
  const hasData = (board, value) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  };

  // check if matrix is full
  export const isFull = (board) => {
    return !hasData(board, 0);
  };

  // selecting random position to set new value
  const getRandomPosition = () => {
    const rowPosition = Math.floor(Math.random() * 4);
    const colPosition = Math.floor(Math.random() * 4);
    return [rowPosition, colPosition];
  };
  
  // select the random position with no value 
  export const generateRandom = (board) => {
    if (isFull(board)) {
      return board;
    }
  
    let [row, col] = getRandomPosition();
    while (board[row][col] !== 0) {
      [row, col] = getRandomPosition();
    }

  // set the value of random matrix to either 2/4 randomly
    board[row][col] = Math.random() < 0.5 ? 2 : 4;
    return board;
  };

  //press Left code starts here


//shift the matrix values to the left
  
  const shiftToLeft = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
      let colIndex = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          newBoard[i][colIndex] = board[i][j];
          colIndex++;
        }
      }
    }
    return newBoard;
  };
  
  // Add the boxes with same value
  const Add = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          board[i][j + 1] = 0;
        }
      }
    }
  
    return board;
  };
  
  export const moveLeft = (board) => {
    const newBoard1 = shiftToLeft(board); // shift values to left
    const newBoard2 = Add(newBoard1); // add boxes with same values
    return shiftToLeft(newBoard2); // shift values to left
  };
// moveLeft code ends

  // code to reverse the matrix
  const reverse = (board) => {
    const reverseBoard = getEmptyBoard();
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        reverseBoard[i][j] = board[i][board[i].length - 1 - j];
      }
    }
  
    return reverseBoard;
  };


  // code for moveRight 
  export const moveRight = (board) => {
    const reversedBoard = reverse(board); //reverse the matrix
    const newBoard = moveLeft(reversedBoard); // get matrix for left press
    return reverse(newBoard); // reverse it back to get right
  };
  

  // rotate matrix by -90 degrees
  const rotateLeft = (board) => {
    const rotateBoard = getEmptyBoard();
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotateBoard[i][j] = board[j][board[i].length - 1 - i];
      }
    }
  
    return rotateBoard;
  };
  
  // rotate matrix by 90 degress
  const rotateRight = (board) => {
    const rotateBoard = getEmptyBoard();
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotateBoard[i][j] = board[board[i].length - 1 - j][i];
      }
    }
  
    return rotateBoard;
  };
  
  export const moveUp = (board) => {
    const rotateBoard = rotateLeft(board); // rotate matrix by -90 degrees
    const newBoard = moveLeft(rotateBoard); // execute matrix for moveLeft
    return rotateRight(newBoard); // rotate back 90 degrees 
  };
  
  export const moveDown = (board) => {
    const rotateBoard = rotateRight(board); // rotate matrix by 90 degrees
    const newBoard = moveLeft(rotateBoard); // execute matrix for moveLeft
    return rotateLeft(newBoard); // rotate back to -90 degrees
  };
  
  // check if value has reached 2048
  export const checkForWin = (board) => {
    return hasData(board, 2048);
  };
  
  // check if board is complete by checking with updated board
  const hasDiff = (board, updatedBoard) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== updatedBoard[i][j]) {
          return true;
        }
      }
    }
    return false;
  };
  
  // check if board is completely filled by comparing previous board and new key press
  export const isDone = (board) => {
    if (hasDiff(board, moveLeft(board))) {
      return false;
    }
    if (hasDiff(board, moveRight(board))) {
      return false;
    }
    if (hasDiff(board, moveUp(board))) {
      return false;
    }
    if (hasDiff(board, moveDown(board))) {
      return false;
    }
    return true;
  };