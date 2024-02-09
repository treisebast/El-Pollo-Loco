class Endboss extends MovableObject{
    world;
    character;
    height = this.height * 4.16;
    width = this.width * 4;
    y = 35;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    startPositionEndboss = 1200;
    lastJump = false;
    lastJumpTime = 0;

    moveZoneX = 125;
    hadFirstContact = false;
    endBossGoAttack = false;
    walkAnimate = true;
    attackAnimate = false;

    endBossIsDead = false;
    gameOver = false;
    energy = 100; 
    immune = false;

    pausedInterval = false;
    timeIsBeginHurt = false;
    beginnAtTimeHurt = 0;

    timeIsBeginRandom = false;
    beginnAtTimeRandom = 0;


    /**
     * collisionbox is a box with offset. This is required for isColliding()
     */
    collisionBoxOffsetY = 70;
    collisionBoxOffsetX = 30;
    collisionBoxWidth = this.width - 40;
    collisionBoxHeight = this.height - 90;


    /**
     * Audio for Animation
     */
    chicken_hurt_sound = new Audio('audio/chicken_hurt2.mp3');
    chicken_sound = new Audio('audio/chicken.mp3');
    chicken_alert = new Audio('audio/chicken_alert.mp3');
    chicken_walking = new Audio('audio/chicken_walking.mp3');
    

    constructor(){
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.speed = 4; // in startMoveInterval like the same write
        this.x = 1200; //TODO: wieder ändern
       
        this.applyGravity();
        this.animate();
    }


    /**
     * Intervals for the animation of Endboss are defined in animate()
     */
    animate() { 
        this.animationInterval = setInterval(() => {
            this.endBossAnimationIntervals();
            
        }, 150);
        this.pushIntervalToArray(this.animationInterval);
        this.startMoveInterval(2.5);
    }


    /**
     * Endboss aniamtion function
     */
    endBossAnimationIntervals(){
        if (this.walkAnimate && !this.isDead() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_WALK);
        } else if (this.attackAnimate && !this.isDead() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.isHurt() && !this.isDead()) {
            this.HurtAnimation();
        } else if (this.isDead()) {
            this.hurtAnimationAndDeadAnimation();
        } else {
            this.playAnimation(this.IMAGES_ALERT);
        }
        this.createTimeOut('timeIsBeginHurt', 1200, 'beginnAtTimeHurt'); 
        this.createTimeOut('timeIsBeginRandom', 4000, 'beginnAtTimeRandom'); 
    }


    hurtAnimationAndDeadAnimation(){
        this.HurtAnimation();
            if ((new Date().getTime() - this.lastHit) > 1800) {
                this.deadAnimation();
            }
    }


    HurtAnimation(){
        this.pausedInterval = true;
        this.chicken_walking.pause();
        this.playAnimation(this.IMAGES_HURT);
        this.createTimeBeginn('timeIsBeginHurt', 'beginnAtTimeHurt');         
    }


    /**
     * SetTimeout function - start the Timeoutfunction
     * 
     * @param {boolean & string} variable - Variable, who will true or false
     * @param {number & string} timeVariable - time - start of timeout
     */
    createTimeBeginn(variable, timeVariable){
        if (!this[variable]) {
            this[variable] = true;
            this[timeVariable] = new Date().getTime();
        } 
    }


    /**
     * Finish Timeout function
     * 
     * @param {boolean & string} variable - Variable, who will true or false
     * @param {number} duration - Duration in milliseconds - is the time for timeout
     * @param {number & string} timeVariable - time - start of timeout from the createTimeBeginn()
     */
    createTimeOut(variable, duration, timeVariable){
        let timePassed = ((new Date().getTime()) - this[timeVariable]);
        if (timePassed >= duration && this[variable]) {
            this[variable] = false;

            if (variable === 'timeIsBeginHurt') {
            this.pausedInterval = false;   
            } else if (variable === 'timeIsBeginRandom') {
            this.animateMathRandom();
            }
        }
    }


    /**
     * MoveInterval from the Endboss
     * 
     * @param {number} speed - speed from the Endboss
     */
    startMoveInterval(speed){
        this.moveInterval = setInterval(() => {
            if (!this.pausedInterval) {
                if (this.world?.character.x > 800 && this.walkAnimate || this.hadFirstContact) {
                    this.playSound(this.chicken_walking, '');
                    this.hadFirstContact = true;
                    this.moveWithinZoneEndboss(speed);
                    if (!this.endBossGoAttack) {
                        this.createTimeJumpBeginn();
                        this.createTimeoutJump(3500);  
                    }
                } 
            }
        }, 60);
        this.pushIntervalToArray(this.moveInterval);
    }
    

    /**
     * Section of Movezone, who will the Endboss alert, attack, move, run and go back
     * 
     * @param {number} speed - speed from the Endboss
     */
    moveWithinZoneEndboss(speed) {   
        if (this.x > this.startPositionEndboss - this.moveZoneX && !this.otherDirection) {
            this.walkAnimate = true;
            this.moveLeft();
            if (this.x <= this.startPositionEndboss - this.moveZoneX + 35 && this.endBossGoAttack) {
                this.endbossAttackZone();
            }
            if (this.x <= this.startPositionEndboss - this.moveZoneX) {
                this.endBossWalkingZone(); 
            }
        } else if (this.x < this.startPositionEndboss && this.otherDirection) {
            this.endBossGoBackZone(speed); 
        }
    }

    endbossAttackZone(){
        this.playSound(this.chicken_walking, 'paused');
        this.playSound(this.chicken_sound, '');
        this.speed = 0.18;
        this.moveLeftSlow();
        this.walkAnimate = false;
        this.attackAnimate = true;         
    }

    endBossWalkingZone(){
        this.walkAnimate = true;
        this.attackAnimate = false;
        this.otherDirection = true;
        this.endBossGoAttack = false;
    }

    endBossGoBackZone(speed){
        this.speed = speed;
        this.moveRight();
        if (this.x >= this.startPositionEndboss) {
            this.otherDirection = false;
            this.walkAnimate = false;
            this.chicken_walking.pause();
            clearInterval(this.moveInterval);
            this.createTimeBeginn('timeIsBeginRandom', 'beginnAtTimeRandom');         
        }        
    }


    /**
     * MathRandom() for Endboss goes attack or walking
     */
    animateMathRandom(){
        this.animateMathRandomIsRun = true;
        let number = Math.random();
        if (number < 0.8) {
            this.endBossWillAttack();
        } else if (number >= 0.8) {
            this.endBossWillWalking(); 
        }      
    }

    endBossWillAttack(){
        this.endBossGoAttack = true;
        this.playSound(this.chicken_walking, 'paused');
        this.playSound(this.chicken_alert, '');
        this.moveZoneX = 250;
        this.speed = 18;
        if (!this.isDead()) {
            this.startMoveInterval(10);
        }
    }

    endBossWillWalking(){
        this.walkAnimate = true;
        this.endBossGoAttack = false;
        this.moveZoneX = 225;
        this.speed = 10;
        if (!this.isDead()) {
            this.startMoveInterval(10);
        }
    }

}