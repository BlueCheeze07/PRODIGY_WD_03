// Initialize the game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle a cell click
function handleClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] === '' && gameActive) {
        // Update the board
        board[cellIndex] = currentPlayer;

        // Update the UI
        renderBoard();

        // Check for a winner
        const winInfo = checkWinner();
        if (winInfo.winner) {
            document.getElementById('result').innerText = `Player ${winInfo.winner} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('result').innerText = 'It\'s a draw!';
            gameActive = false;
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return { winner: board[a], winningCells: pattern };
        }
    }

    return { winner: null, winningCells: null };
}

// Function to render the game board
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.innerText = board[i];

        // Add additional class for X or O cells
        if (board[i] === 'X') {
            cell.classList.add('x');
        } else if (board[i] === 'O') {
            cell.classList.add('o');
        }

        cell.addEventListener('click', handleClick);
        boardElement.appendChild(cell);
    }

    // Check for a winner and apply 'winning' class to the winning cells
    const winInfo = checkWinner();
    if (winInfo.winner) {
        for (const index of winInfo.winningCells) {
            boardElement.children[index].classList.add('winning');
        }
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').innerText = '';
    renderBoard();
}

// Initial render
renderBoard();
