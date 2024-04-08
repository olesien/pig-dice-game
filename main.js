const login = document.querySelector(".login");
const game = document.querySelector(".game");
const playerEl = document.querySelector(".player_name");
const dieEL = document.querySelector("#die");
const rollBtn = document.querySelector(".roll-btn");
const bankBtn = document.querySelector(".bank-btn");

const roundScoreEl = document.querySelector(".round_score");
const roundEl = document.querySelector(".round");
const winnerEl = document.querySelector(".winner");
const totalRoundsEl = document.querySelector(".total_rounds");
const playAgainBtn = document.querySelector(".player-again-btn");

const addNameBtn = document.querySelector("#add-name");
const scoresEl = document.querySelector(".scores");
let playerCount = 1;
let round = 1;
let currentPlayer = 1;
const targetScore = 10;

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max) + 1;
};

const rollDie = () => {
    const randomNumber = getRandomInt(6);
    console.log(randomNumber);
    dieEL.innerHTML = ""; //Clear the element
    dieEL.className = ""; //Clear classlist
    dieEL.classList.add("die-" + randomNumber);
    for (i = 0; i < randomNumber; i++) {
        const div = document.createElement("div");
        dieEL.appendChild(div);
    }

    return randomNumber;
};

const next = (score) => {
    const currentPlayerEl = document.querySelector(
        ".score-player-" + currentPlayer
    );
    const matchScoreEl = currentPlayerEl.querySelector(".score");
    const newScore = Number(matchScoreEl.innerText) + Number(score);
    matchScoreEl.innerText = newScore;
    //Check if someone has won
    if (newScore >= targetScore) {
        //We have a winner!!!
        const winnerPlayerEl = document.querySelector(".winner_player");
        matchScoreEl.innerText = "";
        game.classList.add("hidden");
        winnerEl.classList.remove("hidden");
        totalRoundsEl.innerText = round;
        winnerPlayerEl.innerText =
            currentPlayerEl.querySelector(".score-name").innerText;
        round = 0; //This will be set to 1 right after anyway.
    } else {
        //As nobody has won, we want to go NEXT in the list
        roundScoreEl.innerText = "0";
        currentPlayer++;
        if (currentPlayer > playerCount) {
            //We have gone over, reset to first player
            currentPlayer = 1;
            //We have reached a new round as all players have done their part
            round++;
            roundEl.innerText = round;
        }
        const nextPlayer = document.querySelector(
            ".score-player-" + currentPlayer
        );

        const nameEl = nextPlayer.querySelector(".score-name");

        playerEl.innerText = nameEl.innerText;
        currentPlayerEl.classList.remove("active");
        nextPlayer.classList.add("active");
    }
};

rollDie();

login.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let i = 1; i <= playerCount; i++) {
        //Iterate through all players added, and add them to the leaderboards
        const playerField = login.querySelector("#name-" + i);
        if (i === 1) {
            playerEl.innerText = playerField.value;
        }
        const li = document.createElement("li");
        li.className = "score-player-" + i + (i === 1 ? " active" : "");
        li.innerHTML = `<span class="score-name">${playerField.value}</span> - <span class="score">0</span>`;
        scoresEl.appendChild(li);
    }
    const nameEl = login.querySelector("#name-1");
    playerEl.innerText = nameEl.value;
    game.classList.remove("hidden");
    login.classList.add("hidden");
});

rollBtn.addEventListener("click", () => {
    const num = rollDie();
    if (num === 1) {
        //We want to go next round

        return next(0);
    } else {
        //We want to add the die roll to the round score
        roundScoreEl.innerText = Number(roundScoreEl.innerText) + num;
    }
});

bankBtn.addEventListener("click", () => {
    return next(Number(roundScoreEl.innerText));
});

playAgainBtn.addEventListener("click", () => {
    game.classList.remove("hidden");
    winnerEl.classList.add("hidden");

    currentPlayer = 1;
    round = 1;
    roundScoreEl.innerText = "0";
    roundEl.innerText = "1";

    //Iterate through all scores and reset them
    for (let i = 1; i <= playerCount; i++) {
        const player = document.querySelector(".score-player-" + i);
        const playerScore = player.querySelector(".score");
        playerScore.innerText = "0";

        const playerName = player.querySelector(".score-name");

        if (i == 1) {
            //This is the player that always starts.
            playerEl.innerText = playerName.innerText;
            player.classList.add("active");
        } else {
            player.classList.remove("active");
        }
    }
});

addNameBtn.addEventListener("click", () => {
    playerCount++;
    const div = document.createElement("div");
    div.className = "for-name-" + playerCount;

    const label = document.createElement("label");
    label.for = "name-" + playerCount;
    label.innerText = "Player #" + playerCount;
    div.appendChild(label);
    const inputField = document.createElement("input");
    inputField.id = "name-" + playerCount;
    inputField.type = "text";
    inputField.min = "2";
    inputField.required = true;

    login.insertBefore(div, addNameBtn);
    login.insertBefore(inputField, addNameBtn);
});

//Fake login
// playerEl.innerText = "test";
// game.classList.remove("hidden");
// login.classList.add("hidden");
