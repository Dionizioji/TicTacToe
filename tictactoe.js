//Variáveis para armazenar o estado do jogo
let currentPlayer = 'X';
let gameActive = true;
let roundWon = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

//Declaração das variáveis para armazenar os nomes dos jogadores
let playerOneName = '';
let playerTwoName = '';

//Associar os jogadores aos seus símbolos
let playerSymbols = {
    X: '',
    O: ''
};

//Selecionar os elementos do HTML
const darkLightButton = document.getElementById('dark_light_button');
const root = document.querySelector(':root');
const main = document.querySelector('main');
const playerOne = document.getElementById('player_one');
const playerTwo = document.getElementById('player_two');
const playButton = document.getElementById('letsPlay');
const winnerSpace = document.querySelector('input[name="player_turn"]');
const buttons = document.querySelectorAll('.buttons');

//Modo escuro/claro
darkLightButton.addEventListener('click', function() {
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--pri-color', '#a300a8');
        root.style.setProperty('--sec-color', '#f3ecf2');
        root.style.setProperty('--ter-color', '#aed6dc');
        root.style.setProperty('--qua-color', '#f3ecf2');
        main.dataset.theme = 'light';
    } else {
        root.style.setProperty('--pri-color', '#031030');
        root.style.setProperty('--sec-color', '#a300a8');
        root.style.setProperty('--ter-color', '#aed6dc');
        root.style.setProperty('--qua-color', '#f3ecf2');
        main.dataset.theme = 'dark';
    }
});

//Iniciar o jogo e armazenar os nomes dos jogadores
playButton.addEventListener('click', function() {
    if (this.innerText === "Let's play!") {
        this.innerText = 'Reset Game!';
        playerOneName = playerOne.value || 'Player 1';
        playerTwoName = playerTwo.value || 'Player 2';

        //Associa os nomes aos símbolos X e O
        playerSymbols.X = playerOneName;
        playerSymbols.O = playerTwoName;

        inGame();
    } else {
        this.innerText = "Let's play!";
        offGame();
    }
});

//Função para iniciar o jogo
function inGame() {
    playerOne.disabled = true;
    playerTwo.disabled = true;
    currentPlayer = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    buttons.forEach(button => button.innerText = ''); //Limpa os botões
    winnerSpace.value = `YOUR TURN PLAYER: ${playerSymbols[currentPlayer]}`;
}

//Função para reiniciar o jogo
function offGame() {
    playerOne.disabled = false;
    playerTwo.disabled = false;
    playerOne.value = '';
    playerTwo.value = '';
    gameState = ["", "", "", "", "", "", "", "", ""];
    buttons.forEach(button => button.innerText = ''); // Limpa os botões
    winnerSpace.value = "YOUR TURN PLAYER: ";
    gameActive = false;
}

//Função para atualizar o estado do jogo quando um botão é clicado
buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
        if (!gameActive || gameState[index] !== "") {
            return;
        }

        gameState[index] = currentPlayer;
        button.innerText = currentPlayer;

        checkForWinner();
    });
});

//Verificar se há um vencedor
function checkForWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winnerName = currentPlayer === 'X' ? playerSymbols.X : playerSymbols.O;
        winnerSpace.value = `WINNER: ${winnerName}`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        winnerSpace.value = 'DRAW!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    winnerSpace.value = `YOUR TURN PLAYER: ${playerSymbols[currentPlayer]}`;
}
