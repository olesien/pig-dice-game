const login = document.querySelector(".login");
const game = document.querySelector(".game");
const playerEl = document.querySelector(".player_name");
const dieEL = document.querySelector("#die");
const rollBtn = document.querySelector(".roll-btn");
const bankBtn = document.querySelector(".bank-btn");

const roundScoreEl = document.querySelector(".round_score");
const matchScoreEl = document.querySelector(".current_score");
const roundEl = document.querySelector(".round");
const winnerEl = document.querySelector(".winner");
const totalRoundsEl = document.querySelector(".total_rounds");
const playAgainBtn = document.querySelector(".player-again-btn");
let round = 1;

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max) + 1;
};

const checkWinner = (newScore, matchScoreEl) => {
    if (newScore >= 100) {
        //We have a winner!!!
        matchScoreEl.innerText = "";
        game.classList.add("hidden");
        winnerEl.classList.remove("hidden");
        totalRoundsEl.innerText = round;
        round = 0; //This will be set to 1 right after anyway.
    }
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

const nextRound = (score) => {
    const newScore = Number(matchScoreEl.innerText) + Number(score);
    matchScoreEl.innerText = newScore;
    checkWinner(newScore, matchScoreEl);
    roundScoreEl.innerText = "0";

    round++;
    roundEl.innerText = round;
};

rollDie();

login.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = login.querySelector("#name");
    playerEl.innerText = nameEl.value;
    console.log(e);
    game.classList.remove("hidden");
    login.classList.add("hidden");
});

rollBtn.addEventListener("click", () => {
    const num = rollDie();
    if (num === 1) {
        //We want to go next round

        return nextRound(0);
    } else {
        //We want to add the die roll to the round score
        roundScoreEl.innerText = Number(roundScoreEl.innerText) + num;
    }
});

bankBtn.addEventListener("click", () => {
    return nextRound(Number(roundScoreEl.innerText));
});

playAgainBtn.addEventListener("click", () => {
    game.classList.remove("hidden");
    winnerEl.classList.add("hidden");
});

//Fake login
playerEl.innerText = "test";
game.classList.remove("hidden");
login.classList.add("hidden");
