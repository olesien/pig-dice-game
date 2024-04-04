const login = document.querySelector("#login");
const game = document.querySelector("#game");
let playerName;

login.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = login.querySelector("#name");
    playerName = nameEl.value;
    console.log(e);
    game.classList.remove("hidden");
});
