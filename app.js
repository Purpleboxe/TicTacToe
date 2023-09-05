const Player = (name, sign) => {
    return { name, sign };
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

let indicator = document.querySelector('.indicator');

const gameBoard = (() => {
    const board = [];
    const restart = document.querySelector('.restart');
    let spaces = document.querySelector('.spaces');

    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    board.forEach((item, i) => {
        const space = document.createElement('div');
        space.className = 'space';
        spaces.appendChild(space);

        restart.addEventListener('click', () => {
            board.forEach((item, i) => {
                board[i] = '';
                space.removeAttribute('data');
                space.innerText = '';
                game.currentPlayer = player1;
                game.won = false;
                space.style.backgroundColor = '';
                indicator.innerText = "Player 1's Turn";
            })
        })
    })
    
    Array.from(spaces.children).forEach((space, i) => {
        space.addEventListener('click', () => {
            if (game.won == false) {
                if (space.innerText === '') {
                    space.innerText += game.currentPlayer.sign;
                }
                space.setAttribute('data', game.currentPlayer.sign);
                board[i] = game.currentPlayer.sign;
                game.checkWinner();
                game.spacesLeft -= 1;
                game.currentPlayer === player1 ? space.style.backgroundColor = '#1D3461' : space.style.backgroundColor = '#FFB8D1';
                if (game.won === false) {
                    if (game.currentPlayer === player1) {
                        game.currentPlayer = player2;
                        indicator.innerText = "Player 2's Turn";
                    } else {
                        game.currentPlayer = player1;
                        indicator.innerText = "Player 1's Turn";
                    }
                }
            }
        })
    }) 

    return { board };
})();

const game = (() => {

    let currentPlayer = player1;
    let won = false;

    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7 ,8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        winning.forEach((item, i) => {
            if (gameBoard.board[item[0]] === this.currentPlayer.sign && gameBoard.board[item[1]] === this.currentPlayer.sign && gameBoard.board[item[2]] === this.currentPlayer.sign) {
                console.log(this.currentPlayer.name + ' Wins!');
                this.won = true;
                indicator.innerText = this.currentPlayer.name + " Wins!";
            }
        })
    }

    return { 
        checkWinner,
        currentPlayer,
        won
     };
})();