let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("canvas").style.display = "flex";
    document.getElementById("headerPenel").style.justifyContent = "center";
    init();
}


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    console.log(world.level.enemies);
    console.log("My charakter is", world.character);
}


function handleGameEnd(winOrLose) {
    console.log("Spiel beendet!");

    let endScreen = document.getElementById("endScreen");
    endScreen.style.display = "flex";

    let imageEndScreen = document.getElementById("imageEndScreen");
    if (winOrLose == "youWin") {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/game over!.png";
    } else {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    }
}

