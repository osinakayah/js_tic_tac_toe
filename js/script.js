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
