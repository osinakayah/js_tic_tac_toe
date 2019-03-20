
GameBoard = (function () {
    let gameBoardViewContainer = null;
    let playerOne = null;
    let playerTwo = null;
    let hasGameStarted = false
    const isWinningMove = (gameboard) => {
        switch (true) {
            case (gameboard[0] === 'O' && gameboard[1] === 'O' && gameboard[2] === 'O') || (gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] === 'X'):
                return true
            case (gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] === 'O') || (gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] === 'X'):
                return true
            case (gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] === 'O') || (gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] === 'X'):
                return true
            case (gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] === 'O') || (gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] === 'X'):
                return true
            case (gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] === 'O') || (gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] === 'X'):
                return true
            case (gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] === 'O') || (gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] === 'X'):
                return true
            case (gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] === 'O') || (gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] === 'X'):
                return true
            case (gameboard[2] === 'O' && gameboard[4] === 'O' && gameboard[6] === 'O') || (gameboard[2] === 'X' && gameboard[4] === 'X' && gameboard[6] === 'X'):
                return true
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
            alert(playerOne.getPlayerName()+ ' is the winner')
        }
        else if (playerTwo.getPlayerTurn()) {
            alert(playerTwo.getPlayerName()+ ' is the winner')
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
