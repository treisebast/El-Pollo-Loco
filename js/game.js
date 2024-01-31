let canvas;
let world;
let keyboard = new Keyboard();

function startGame(){
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'flex';
    init();
}


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    
    console.log(world.level.enemies);
    console.log('My charakter is', world.character);

}


function handleGameEnd(winOrLose) {
    console.log("Spiel beendet!");

    let endScreen = document.getElementById('endScreen');
    endScreen.style.display = 'flex'; 

    let imageEndScreen = document.getElementById('imageEndScreen');
    if (winOrLose == 'youWin') {
        imageEndScreen.src = 'img/9_intro_outro_screens/game_over/game over!.png';  
    } else {
        imageEndScreen.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png';
    }
}



document.addEventListener('keydown', (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68 ) {
        keyboard.D = true;
    }
});


document.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68 ) {
        keyboard.D = false;
    }

});
