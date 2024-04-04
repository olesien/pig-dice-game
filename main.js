const login = document.querySelector(".login");
const game = document.querySelector(".game");
const playerEl = document.querySelector(".player_name");
const dieEL = document.querySelector("#die");
const rollBtn = document.querySelector(".roll-btn");
const bankBtn = document.querySelector(".bank-btn");

const roundScoreEl = document.querySelector(".round_score");
const matchScoreEl = document.querySelector(".current_score");
const roundEl = document.querySelector(".round");
let round = 1;

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

const nextRound = (score) => {
    round++;
    roundEl.innerText = round;
    matchScoreEl.innerText = Number(matchScoreEl.innerText) + Number(score);
    roundScoreEl.innerText = "0";
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

//Fake login
playerEl.innerText = "test";
game.classList.remove("hidden");
login.classList.add("hidden");
