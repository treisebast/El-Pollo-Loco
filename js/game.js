let canvas;
let world;
let keyboard = new Keyboard();

let allIntervals = [];
let isPaused = false;
let gameStart = false;

let pauseIcon = document.getElementById('pauseIcon');
let playIcon = document.getElementById('playIcon');


function startGame(x) {
    if (!(x === 'play-btn')) {
        togglePause('start-btn');
    }
    let layerIds = ["canvas", "movePenelLeft", "movePenelRight"]
    layerIds.forEach((id) => {
        document.getElementById(id).classList.add('show');
    })
    document.getElementById("startScreen").classList.add('none-show');
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
    gameIsStarted('GameOver');

    let endScreen = document.getElementById("endScreen");
    endScreen.classList.add('show');

    let imageEndScreen = document.getElementById("imageEndScreen");
    if (winOrLose == "youWin") {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/game over!.png";
    } else {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    }
}


function setStoppableInterval(id){
    allIntervals.push(id);
}


function clearAllIntervals(){
    allIntervals.forEach(clearInterval);
    allIntervals.length = 0;
}


function restartGame(){
    let layerIds = ["canvas", "movePenelLeft", "movePenelRight"]
    let endScreen = document.getElementById("endScreen");
    endScreen.classList.remove('show');

    cancelAnimationFrame(world.requestAnimationFrame);
    
    let ctx = world.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    document.getElementById("startScreen").classList.remove('none-show');
    layerIds.forEach((id) => {
        document.getElementById(id).classList.remove('show');
    })
    document.getElementById("headerPenel").style.justifyContent = "flex-end";  
}



function togglePause(x) {
    document.getElementById('canvas').focus();
    if (isPaused && gameStart) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'flex';
        isPaused = false;
        resumeIntervals();
    } else if (!isPaused && gameStart) {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'flex';
        isPaused = true;
        pauseIntervals();
    } 
    gameIsStarted(x);
}


function gameIsStarted(x){
    document.getElementById('canvas').focus();
    if (!gameStart && !isPaused){
        gameStart = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'flex';
        if (x === 'play-btn') {
            restartGame();
            startGame('play-btn');
        }  
    } else if (x === 'GameOver') {
        gameStart = false;
        playIcon.style.display = 'flex';
        pauseIcon.style.display = 'none';
    }
}


function pauseIntervals() {
    for (let intervalId of allIntervals) {
        clearInterval(intervalId);
    }
}


function resumeIntervals() {
    world.run();
    world.character.animate();
    world.character.applyGravity();
    world.thrownBottle.forEach((bottle) => {
        bottle.throw();
    });
    world.level.enemies.forEach((e) => {
        e.animate();
        e.applyGravity();
    });
    world.level.endBoss.forEach((b) => {
        b.animate();
        b.applyGravity();
    });
    world.level.placedItems.forEach((item) => {
        if (item instanceof Coins) {
            item.animate();
        }
    });
    world.level.clouds.forEach((c) => {
        c.animate();
    })
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
