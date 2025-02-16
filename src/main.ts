document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".button");
    const reset = document.querySelector(".restart") as HTMLButtonElement;
    const title = document.querySelector(".title") as HTMLHeadingElement;

    let board: string[] = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer: "X" | "O" = "X";
    let gameActive: boolean = true;

    function updateUI() {
        buttons.forEach((button, index) => {
            button.querySelector("span")!.textContent = board[index];
            button.querySelector("span")!.style.opacity = board[index] ? "1" : "0";
        });
        title.textContent = gameActive ? `Current Player: ${currentPlayer}` : title.textContent;
        localStorage.setItem("ticTacToe", JSON.stringify({ board, currentPlayer, gameActive }));
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                title.textContent = `Player ${board[a]} Has Proven Victorious!`;
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            title.textContent = "A stalemate shrouds the battlefield...";
        }
    }

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (!gameActive || board[index]) return;
            board[index] = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateUI();
            checkWinner();
        });

        button.addEventListener("mouseover", () => {
            if (gameActive && !board[index]) {
                button.querySelector("span")!.textContent = currentPlayer;
                button.querySelector("span")!.style.opacity = "0.5";
            }
        });

        button.addEventListener("mouseout", () => {
            if (!board[index]) {
                button.querySelector("span")!.textContent = "";
            }
        });
    });

    reset.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        title.textContent = "Tic Tac Toe";
        updateUI();
    });

    const localGame = localStorage.getItem("ticTacToe");
    if (localGame) {
        const { board: savedBoard, currentPlayer: savedPlayer, gameActive: savedGameActive } = JSON.parse(localGame);
        board = savedBoard;
        currentPlayer = savedPlayer;
        gameActive = savedGameActive;
        updateUI();
    }

    updateUI();
});
