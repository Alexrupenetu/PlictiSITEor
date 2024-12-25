const TicTac = {
    cPlayer: "X",
    state:Array(9).fill(null),
    gameOver:false,

    init(){
        this.cBoard();
        document    
            .getElementById("reset")
            .addEventListener("click", () => this.reset());
    },

    cBoard(){
        const board = document.getElementById("board");
        board.innerHTML = "";
        this.state.forEach((_,i) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = i;
                board.appendChild(cell);
        });

        board.addEventListener("click", (e)=>this.handleClick(e));

        this.uMessage(`Player ${this.cPlayer}'s turn`);

    },

    handleClick(e) {
        const cell = e.target;
        const i = cell.dataset.index;
    
        if (this.gameOver || !cell.classList.contains("cell") || this.state[i])
            return;
    
        this.state[i] = this.cPlayer;
        cell.textContent = this.cPlayer;
        cell.classList.add("taken", this.cPlayer); // Add class for specific styling
    
        const winCombo = this.checkWin();
        if (winCombo) {
            this.highlight(winCombo);
            this.uMessage(`Player ${this.cPlayer} wins!`);
            this.gameOver = true;
        } else if (this.state.every((cell) => cell)) {
            this.uMessage("It's a tie!");
            this.gameOver = true;
        } else {
            this.cPlayer = this.cPlayer === "X" ? "O" : "X";
            this.uMessage(`Player ${this.cPlayer}'s turn`);
        }
    },

    checkWin(){
        const wins = [
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return wins.find((combo) => combo.every((i) => this.state[i] === this.cPlayer));

    },

    highlight(combo){

        const winningLine = document.getElementById("winningLine");

        // Map winning combinations to line styles
        const lineStyles = {
            "0,1,2": "horizontal-0",
            "3,4,5": "horizontal-1",
            "6,7,8": "horizontal-2",
            "0,3,6": "vertical-0",
            "1,4,7": "vertical-1",
            "2,5,8": "vertical-2",
            "0,4,8": "diagonal-0",
            "2,4,6": "diagonal-1",
        };
    
        // Get the winning line class
        const comboKey = combo.sort().join(",");
        const lineClass = lineStyles[comboKey];
    
        // Apply the appropriate class to the winning line
        if (lineClass) {
            winningLine.classList.add(lineClass);
            winningLine.style.display = "block"; // Make the line visible
        }

        combo.forEach((i) => {document.getElementById("board").children[i].computedStyleMap.color = "red"});

    },

    reset(){
        this.state = Array(9).fill(null);
        this.cPlayer = "X";
        this.gameOver = false;

        const winningLine = document.getElementById("winningLine");
        winningLine.style.display = "none";
        winningLine.className = "winning-line";

        this.cBoard();
    },

    uMessage(msg){
        document.getElementById("message").textContent = msg;
    },
};

TicTac.init();