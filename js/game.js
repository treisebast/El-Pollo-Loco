let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    document.getElementById("startScreen").classList.add('none-show');
    document.getElementById("canvas").classList.add('show');
    document.getElementById("movePenelLeft").classList.add('show');
    document.getElementById("movePenelRight").classList.add('show');
    document.getElementById("headerPenel").style.justifyContent = "center";

    init();
}


function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log(world.level.enemies);
    console.log("My charakter is", world.character);
}


function handleGameEnd(winOrLose) {
    console.log("Spiel beendet!");

    clearAllIntervals();

    let endScreen = document.getElementById("endScreen");
    endScreen.classList.add('show');

    let imageEndScreen = document.getElementById("imageEndScreen");
    if (winOrLose == "youWin") {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/game over!.png";
    } else {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    }
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++){
        window.clearInterval(i);
    }
}


function restartGame(){
    
}

