// Setup the Gameboard

const gameBoard = (() => {
  const board = ['', '', '',
    '', '', '',
    '', '', ''
  ];


  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }

    return false;
  };


  const resetBoard = (boardItems) => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
      boardItems.forEach(item => item.textContent = '');
    }
  };

  return {
    board,
    checkWin,
    resetBoard
  };


})();


// Player Factory Function

const Player = (name, marker) => {

  const getName = () => name;
  const getMarker = () => marker;

  return {
    getName,
    getMarker
  };
};



const displayController = (() => {
  const gameBoardCells = document.querySelectorAll('.item');
  const playerOne = Player('Rhys', 'O');
  const playerTwo = Player('Joe', 'X');

  let currentPlayer = playerOne;


  gameBoardCells.forEach((element, index) => {
    element.addEventListener('click', () => {
      if (gameBoard.board[index] === '') {
        gameBoard.board[index] = currentPlayer.getMarker();
        element.textContent = gameBoard.board[index];
        element.removeEventListener('click', () => {});

        if (gameBoard.checkWin()) {
          console.log(`${currentPlayer.getName()} wins!`);
          gameBoard.resetBoard(gameBoardCells);
        }

        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

      } else {
        console.log("A marker has already been placed there");
      }
    })
  });

})();