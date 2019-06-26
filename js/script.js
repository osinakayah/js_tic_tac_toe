
GameBoard = (function () {
    let gameBoardViewContainer = null;
    let playerOne = null;
    let playerTwo = null;
    let hasGameStarted = false
    const boardSquares = 3; // The number of square boxes


    const checkIfAllValuesAreSame = (markersArr) => {
        if (markersArr.length > 2 && markersArr[0] !== null) {
            return markersArr.every( v => v === markersArr[0] )
        }
        return false;

    }

    const checkForTopLeftDiagonalSequence = (gameboard) => {
        const a = 1;
        const d = boardSquares + 1;
        const markersQue = [];
        for (let n = 1; n <= boardSquares; n++) {
            const nthTerm = a+ ((n -1) * d);
            markersQue.push(gameboard[nthTerm - 1]);
        }
        if (checkIfAllValuesAreSame(markersQue)) {
            console.log(markersQue, 'checkForTopLeftDiagonalSequence', checkIfAllValuesAreSame(markersQue))
            return true
        }
        return false;
    }
    const checkForTopRightDiagonalSequence = (gameboard) => {
        const a = boardSquares;
        const d = boardSquares - 1;
        const markersQue = [];
        for (let n = 1; n <= boardSquares; n++) {
            const nthTerm = a+ ((n -1) * d);
            markersQue.push(gameboard[nthTerm - 1]);
        }
        if (checkIfAllValuesAreSame(markersQue)) {
            console.log(markersQue, 'checkForTopRightDiagonalSequence', checkIfAllValuesAreSame(markersQue))
            return true
        }
        return false;
    }

    const checkForVerticalSequence = (gameboard) => {
        const d = boardSquares;
        for (let a = 1; a <= boardSquares; a++) {
            const markersQue = [];
            for (let n = 1; n <= boardSquares; n++) {
                const nthTerm = a+ ((n -1) * d);
                markersQue.push(gameboard[nthTerm - 1]);
            }
            if (checkIfAllValuesAreSame(markersQue)) {
                console.log(markersQue, 'checkForVerticalSequence', checkIfAllValuesAreSame(markersQue))
                return true
            }
        }
        return false;
    }
    const checkHorizontalSequence = (gameboard) => {
        const d = 1;
        for (let a = 1; a < boardSquares**2; a = a + boardSquares) {
            const markersQue = [];
            for (let n = 1; n <= boardSquares; n++) {
                const nthTerm = a+ ((n -1) * d);
                markersQue.push(gameboard[nthTerm - 1]);
            }
            if (checkIfAllValuesAreSame(markersQue)) {
                console.log(markersQue, 'checkHorizontalSequence', checkIfAllValuesAreSame(markersQue))
                return true
            }
        }
        return false
    }


    const isWinningMove = (gameboard) => {

        switch (true) {
            case checkForTopRightDiagonalSequence(gameboard):
                return true
            case checkForTopLeftDiagonalSequence(gameboard):
                return true
            case checkHorizontalSequence(gameboard):
                return true
            case checkForVerticalSequence(gameboard):
                return true;
        }
    }
    const isTie = (gameboard) => gameboard.filter(gameSpot => gameSpot === null).length === 0
    const reDrawOnBoard = (gameboard, position, marker) => {
      const newGameboardDrawing = gameboard.map((item, index) => {
        if (index === position) {
            return marker
        }
        return item;
      });
      if (isWinningMove(newGameboardDrawing)) {
        if (playerOne.getPlayerTurn()) {
            document.getElementById('winner').innerHTML = playerOne.getPlayerName()+ ' is the winner';

        }
        else if (playerTwo.getPlayerTurn()) {
            document.getElementById('winner').innerHTML = playerTwo.getPlayerName()+ ' is the winner';
        }
        playerOne.setPlayerTurn(false);
        playerTwo.setPlayerTurn(false)
        hasGameStarted = false
      }
      if (isTie(newGameboardDrawing)) {
        hasGameStarted = false
        alert('Is a tie')
      }
      renderGameBoard(newGameboardDrawing)
    }

    const attachEvent = (gameboard) => {
      if (!hasGameStarted) {
        return
      }
      const cells = document.getElementsByClassName('tic-tac-toe-cell');

      for (let i = 0; i < cells.length; i ++) {
        cells[i].onclick = (e) => {
          const index = e.target.getAttribute('data-cell-index');
          if (gameboard[parseInt(index)]) {
              alert('Please play on another tile');
              return;
          }
          const marker = playerTwo.getPlayerTurn() === true? playerTwo.getMarker() : playerOne.getMarker()

          reDrawOnBoard(gameboard, parseInt(index), marker)

          playerOne.setPlayerTurn(!playerOne.getPlayerTurn());
          playerTwo.setPlayerTurn(!playerTwo.getPlayerTurn())

        }
      }
    }
    const renderGameBoard = (gameboard) => {
        const view = gameboard.reduce((sumPositions, currentPosition, index) => {
            return `${sumPositions}
                <div data-cell-index="${index}" class="col-4 tic-tac-toe-cell">${currentPosition === null ? '' : currentPosition}</div>
            `
        }, '');
        document.getElementById(gameBoardViewContainer).innerHTML = view;
        attachEvent(gameboard);
        return gameboard
    }

    return {
        init: (gameBoardContainer, _playerOne, _playerTwo) => {
            hasGameStarted = true
            gameBoardViewContainer = gameBoardContainer;

            playerOne = _playerOne;
            playerTwo = _playerTwo;

            playerOne.setPlayerTurn(true)
            playerTwo.setPlayerTurn(false)

            renderGameBoard(Array(9).fill(null));

        }
    }
})();

PlayerFactory = function (playerName, marker) {
  let isPlayerTurn = false

  const setPlayerTurn = (_isPlayerTurn) => {
    isPlayerTurn = _isPlayerTurn
  }
  const getPlayerTurn = () => isPlayerTurn

  return {
    getPlayerName:()  => playerName,
    getMarker: () => marker,
    getPlayerTurn,
    setPlayerTurn
  }
}
