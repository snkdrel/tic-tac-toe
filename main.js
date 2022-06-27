const gameBoard = (() => {
    let gameBoardArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const displayBoard = () => {
        cells.forEach((cell) => {
            const x = cell.getAttribute('class').slice(1,2);
            const y = cell.getAttribute('class').slice(2);
            cell.textContent = gameBoardArray[x][y];
        });
    };
    const newMark = (coordinates, mark) => {
        const x = coordinates.slice(0,1);
        const y = coordinates.slice(1);
        if(gameBoardArray[x][y] != ''){
            return 1;
        }else{
            gameBoardArray[x][y] = mark;
            displayBoard();
            return 0;
        }
    };
    return {gameBoardArray, newMark};
})();

const playerFactory = (mark) => {
    let cellsOccupied = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    const checkWinCondition = () => {
        if( cellsOccupied[0][0] && cellsOccupied[0][1] && cellsOccupied[0][2] || 
            cellsOccupied[1][0] && cellsOccupied[1][1] && cellsOccupied[1][2] ||
            cellsOccupied[2][0] && cellsOccupied[2][1] && cellsOccupied[2][2] ||
            cellsOccupied[0][0] && cellsOccupied[1][0] && cellsOccupied[2][0] ||
            cellsOccupied[0][1] && cellsOccupied[1][1] && cellsOccupied[2][1] ||
            cellsOccupied[0][2] && cellsOccupied[1][2] && cellsOccupied[2][2] ||
            cellsOccupied[0][0] && cellsOccupied[1][1] && cellsOccupied[2][2] ||
            cellsOccupied[0][2] && cellsOccupied[1][1] && cellsOccupied[2][0]){
                return 0;
            } else {
                return 1;
            }
    };
    const occupyCell = (coordinates) => {
        const x = coordinates.slice(0,1);
        const y = coordinates.slice(1);
        cellsOccupied[x][y] = 1;
    }
    return {mark, occupyCell, checkWinCondition};
};

const gameController = (() => {
    const player1 = playerFactory('X');
    const player2 = playerFactory('O');
    let turnsPassed = 0;

    const makeTurn = (cellClass) => {
        let currentPlayer;
        if(turnsPassed % 2 == 0){
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }
        if(!gameBoard.newMark(cellClass.slice(1), currentPlayer.mark)){
            currentPlayer.occupyCell(cellClass.slice(1))
            turnsPassed++;
            // Check if player won
            if(!currentPlayer.checkWinCondition()){
                alert('Player ' + ((turnsPassed-1) % 2 == 0 ? '1':'2') + ' wins!');
            }
        }
    };
    return{makeTurn};
})();

const cells = document.querySelectorAll('td');
cells.forEach((c) => {
    c.addEventListener('click', () => {
        const winner = gameController.makeTurn(c.getAttribute('class'));
    });
});