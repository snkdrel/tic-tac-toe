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
    return {mark};
};

const gameController = (() => {
    const player1 = playerFactory('X');
    const player2 = playerFactory('O');
    let turnsPassed = 0;

    const makeTurn = (cellClass) => {
        let currentPlayer;
        if(turnsPassed % 2 == 0){
            currentPlayer = player1;
        }else{
            currentPlayer = player2;
        }
        if(!gameBoard.newMark(cellClass.slice(1), currentPlayer.mark)){
            turnsPassed++;
        }
    };
    return{makeTurn};
})();

const cells = document.querySelectorAll('td');
cells.forEach((c) => {
    c.addEventListener('click', () => {
        gameController.makeTurn(c.getAttribute('class'));
    });
});