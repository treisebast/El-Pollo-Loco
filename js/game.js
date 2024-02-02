let canvas;
let world;
let keyboard = new Keyboard();

let allIntervals = [];
let isPaused = false;


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


// function clearAllIntervals() {
//     for (let i = 1; i < 9999; i++){
//         window.clearInterval(i);
//     }
// }

function setStoppableInterval(id){
    allIntervals.push(id);
}


function clearAllIntervals(){
    allIntervals.forEach(clearInterval);
    allIntervals.length = 0;
}


function restartGame(){
    
}


function togglePause() {
    let pauseIcon = document.getElementById('pauseIcon');
    let playIcon = document.getElementById('playIcon');

    if (isPaused) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
        resumeIntervals();
    } else {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'inline-block';
        pauseIntervals();
    }
    isPaused = !isPaused;
}


function pauseIntervals() {
    for (let intervalId of allIntervals) {
        clearInterval(intervalId);
    }
}


function resumeIntervals() {
    Character.animate();
}





function toggleFullScreen(){
    let layerIds = ['overlay', 'startScreen', 'canvas', 'endScreen'];
    let fullscreenIcon = document.getElementById('fullscreenIcon');
    let exitFullscreenIcon = document.getElementById('exitFullscreenIcon');

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        exitFullscreenIcon.style.display = 'none';
        fullscreenIcon.style.display = 'flex';
        exitFullscreen(layerIds);
    } else {
        fullscreenIcon.style.display = 'none';
        exitFullscreenIcon.style.display = 'flex';
        enterFullscreen(document.body, layerIds);
    }
}


function enterFullscreen(element, layerIds) {
    layerIds.forEach((id) => {
        document.getElementById(id).classList.add('fullScreenUpperSize');
    })
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen(layerIds) {
    layerIds.forEach((id) => {
        document.getElementById(id).classList.remove('fullScreenUpperSize');
    })

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
