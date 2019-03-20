
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


    return {

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
