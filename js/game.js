let canvas;
let world;
let keyboard = new Keyboard();

let allIntervals = [];
let isPaused = false;
let gameStart = false;
let restartIsAllowed = false;

let pauseIcon = document.getElementById('pauseIcon');
let playIcon = document.getElementById('playIcon');

let isMuted = true;
let win_sound = new Audio('audio/win.mp3');
let lose_sound = new Audio('audio/lose.mp3');
let chicken_walking = new Audio('audio/chicken_walking.mp3');
let play_sound = new Audio('audio/mexican.mp3');
play_sound.volume = 0.13;
play_sound.loop = true;




/**
 * StartGame
 * 
 * @param {string} x - x assumes a certain string when the game is started with togglePause()
 */
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


/**
 * Initialize game
 * 
 */
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    console.log(world.level.enemies);
    console.log("My charakter is", world.character);
}


/**
 * Instruction show
 * 
 * @param {string} add_remove - add_remove assumes a certain string to add or remove classList
 */
function toggleShowInstruction(add_remove){
    let layerIds = ['startGameBtn', 'instructionBtn', 'headerPenel']

    let instruction = document.getElementById("instructionContainer");
    instruction.classList[add_remove]('show');

    layerIds.forEach((id) => {
    document.getElementById(id).classList[add_remove]('none-show');
    })    
}


/**
 * Game end win oder lose
 * 
 * @param {string} winOrLose - winOrLose assumes a certain string for win or lose the game
 */
function handleGameEnd(winOrLose) {
    clearAllIntervals();
    gameIsStarted('GameOver');

    let endScreen = document.getElementById("endScreen");
    endScreen.classList.add('show');

    let imageEndScreen = document.getElementById("imageEndScreen");
    if (winOrLose == "youWin") {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/game over!.png";
        win_sound.play();
    } else {
        imageEndScreen.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
        lose_sound.play();
    }
}


/**
 * Push Intervals to Array
 * 
 * @param {intervalId} id - Id from the intervals and push in the Array allIntervals
 */
function setStoppableInterval(id){
    allIntervals.push(id);
}


/**
 * Clear all Intervals
 * 
 */
function clearAllIntervals(){
    allIntervals.forEach(clearInterval);
    allIntervals.length = 0;
}


/**
 * Game restart
 * 
 */
function restartGame(){
    let endScreen = document.getElementById("endScreen");
    endScreen.classList.remove('show');

    cancelAnimationFrame(world.requestAnimationFrame);
    
    let ctx = world.canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById("headerPenel").style.justifyContent = "flex-end";  
    document.getElementById("startScreen").classList.remove('none-show');
    let layerIds = ["canvas", "movePenelLeft", "movePenelRight"]
    layerIds.forEach((id) => {
        document.getElementById(id).classList.remove('show');
    })
}


/**
 * Audiosound mute and unmute with button(click/ touch)
 * 
 */
window.addEventListener('DOMContentLoaded', () => {
    toggleSoundMute();
 })    


function toggleSoundMute() {
    let musicNoteIcon = document.getElementById('musicNoteIcon');
    let musicOffIcon = document.getElementById('musicOffIcon');
    if (isMuted) {
        muteSound();
        musicNoteIcon.style.display = 'none';
        musicOffIcon.style.display = 'flex';
    } else {
        unmuteSound();
        musicNoteIcon.style.display = 'flex';
        musicOffIcon.style.display = 'none';
    }
    document.getElementById('canvas').focus();
}


function unmuteSound(){
    isMuted = true; 
    play_sound.loop = true;
    play_sound.play();
}


function muteSound(){
    isMuted = false; 
    play_sound.loop = false;
    play_sound.pause();
}


/**
 * Switch between playback and paused sound from code
 * 
 * @param {variable} sound - variable from the new Audio() data
 * @param {string} paused - paused assumes a certain string for pause - ('paused') or play - ('')
 */
function togglePlaySound(sound, paused){
    if (!isMuted || paused === 'paused') {
        sound.pause();
    } else if (paused === '') {
        sound.play();  
    } 
}


/**
 * Section to toggle game play and pause
 * 
 * @param {string} x - x assumes a certain string for restart game
 */
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
        checkStartAndRestart(x);
    } else if (x === 'GameOver') {
        gameStart = false;
        restartIsAllowed = true;
        playIcon.style.display = 'flex';
        pauseIcon.style.display = 'none';
    }
}


function checkStartAndRestart(x){
    if (x === 'play-btn') {
        startGame('play-btn');
        if (restartIsAllowed == true) {
        restartGame();  
        }
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
        bottle.applyGravity();
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


/**
 * Section to toggle Full-Screen and normal Screen
 * 
 */
function toggleFullScreen(){
    let layerIds = ['overlay', 'startScreen', 'canvas', 'endScreen', 'instructionContainer'];
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
