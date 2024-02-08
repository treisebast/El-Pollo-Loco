class Character extends MovableObject {
    y = 230;
    speed = 7;
    height = this.height * 2;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png"
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png"
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    world;

    startTime = new Date().getTime();
    currentTime;

    isHurtCharacter = false;
    immune = false;
    gameOver = false;

    /**
     * Audio for Animation
     */
    walking_sound = new Audio("audio/running.mp3");
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');


    /**
     * collisionbox is a box with offset. This is required for isColliding()
     */
    collisionBoxOffsetY = 80;
    collisionBoxOffsetX = 15;
    collisionBoxWidth = 60;
    collisionBoxHeight = (this.height / 1.8);
    
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    
    /**
     * Intervals for the Character Moves and for the animation of images are defined in animate()
     */
    animate() {
        this.moveInterval = setInterval(() => {
            this.charcterMoveInterval();
        }, 25);
        this.pushIntervalToArray(this.moveInterval);

        this.animationInterval = setInterval(() => {
            this.currentTime = new Date().getTime();
            this.characterPlayAnimationInterval();
        }, 180); 
        this.pushIntervalToArray(this.animationInterval);
    }


    /**
     * Some functions for the Moves of the Character
     */
    charcterMoveInterval(){
        this.charcterMoveRight();
        this.charcterMoveLeft();
        this.charcterMoveJump();
            
        this.playSound(this.walking_sound, 'paused');
        this.world.camera_x = -this.x + 135;
        this.world.createNewChickenIfNecessary();
    }


    charcterMoveRight(){
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.setThrowOtherDirection(false);
            this.startTime = this.currentTime;
            this.playSound(this.walking_sound, '');
        }
    }


    charcterMoveLeft(){
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true; 
            this.setThrowOtherDirection(true);
            this.startTime = this.currentTime;
            this.playSound(this.walking_sound, '');
        }
    }


    charcterMoveJump(){
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.startTime = this.currentTime;
            this.playSound(this.jump_sound, '');
        }
    }


    /**
     * Functions for the Animate of the character
     */
    characterPlayAnimationInterval(){
        if (this.isDead()) {
            this.deadAnimation();
        } else if (this.isHurt()) {
            this.isHurtBounce();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {    
            this.playAnimation(this.IMAGES_WALKING); 
        } else if (10000 > this.currentTime - this.startTime){
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } 
    }


    /**
     * If the Character colliding with Endboss, then the character move 200px back automaticly 
     */
    isHurtBounce(){
        if (!this.isHurtCharacter) {
            this.isHurtCharacter = true;
            this.x = (this.x - 200);
            setTimeout(() => {
                this.isHurtCharacter = false;
            }, 1000);
        }
        this.playAnimation(this.IMAGES_HURT);
    }

}
