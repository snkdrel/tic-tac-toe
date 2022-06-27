const gameBoard = (() => {
    const gameBoardArray = [
        ['x', 'x', 'o'],
        ['o', 'x', 'o'],
        ['o', 'o', 'x']
    ];
    const displayBoard = () => {
        const table = document.querySelectorAll('td');
        table.forEach((cell) => {
            cell.textContent = 'X';
        });
    };
    return {gameBoardArray, displayBoard};
})();

const playerFactory = (mark) => {
    return {mark};
};

const gameController = (() => {
    const player1 = playerFactory('X');
    const player2 = playerFactory('O');
})();

gameBoard.displayBoard();