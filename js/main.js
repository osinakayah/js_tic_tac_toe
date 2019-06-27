document.getElementById('start_game').addEventListener('click', () => {
    const playerOneName = document.getElementById('player_one_name').value;
    const playerTwoName = document.getElementById('player_two_name').value;

    if (playerOneName.length === 0 || playerTwoName.length === 0) {
        alert('Please Enter Player Name');
        return
    }
    const playerOne = PlayerFactory(playerOneName, 'X')
    const playerTwo = PlayerFactory(playerTwoName, 'O')
    GameBoard.init('game_board', playerOne, playerTwo);

    document.getElementById('player_one_name_display').innerHTML = playerOneName
    document.getElementById('player_two_name_display').innerHTML = playerTwoName
})