class Endboss extends MovableObject{
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

    world;

    collisionBoxOffsetY = 70;
    collisionBoxOffsetX = 30;
    collisionBoxWidth = this.width - 40;
    collisionBoxHeight = this.height - 90;

    startPositionEndboss = 1200;
    lastJump = 'last';

    moveZoneX = 200;
    enemyIsDead = false;
    hadFirstContact = false;
    
    endBossGoAttack = false;
    animateMathRandomIsRun = false;


    constructor(){
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.speed = 2.5; // in startMoveInterval like the same write
        this.x = 1200; //TODO: wieder ändern
       
        this.applyGravity();
        this.animate();

    }


    animate() { 
        this.animationInterval = setInterval(() => {
            if (this.walkAnimate) {
                this.playAnimation(this.IMAGES_WALK);
            } else if (this.attackAnimate) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            } 

            // this.playAnimation(this.IMAGES_HURT);
            // this.playAnimation(this.IMAGES_DEAD);
        }, 150);

        this.startMoveInterval(2.5);
    }


    startMoveInterval(speed){
        this.moveInterval = setInterval(() => {
            console.log('läuft!')
            if (this.world?.character.x > 800 && this.walkAnimate || this.hadFirstContact) {
                this.hadFirstContact = true;
                this.moveWithinZoneEndboss(speed);
                if (!this.endBossGoAttack) {
                    this.checkAndPerformJump();  
                }
            }
        }, 50);
    }
    
    walkAnimate = true;
    attackAnimate = false;
    moveWithinZoneEndboss(speed) {   
       if (this.x > this.startPositionEndboss - this.moveZoneX && !this.otherDirection) {
            this.walkAnimate = true;
            this.moveLeft();
            if (this.x <= this.startPositionEndboss - this.moveZoneX + 75 && this.endBossGoAttack) {
                this.speed = 0.5;
                this.moveLeftSlow();
                this.walkAnimate = false;
                this.attackAnimate = true;
            }          
            if (this.x <= this.startPositionEndboss - this.moveZoneX) {
                this.attackAnimate = false;
                this.otherDirection = true;
                this.endBossGoAttack = false;
                this.walkAnimate = true;
            }


        } else if (this.x < this.startPositionEndboss && this.otherDirection) {
            this.speed = speed;
            this.moveRight();
            if (this.x >= this.startPositionEndboss) {
                this.otherDirection = false;
                this.walkAnimate = false;
                
                if (!this.animateMathRandomIsRun) {
                    this.animateMathRandom();   
                }  
            }
        }
    }


    checkAndPerformJump() {
        if (this.lastJump === 'last' && !this.endBossGoAttack) {
            this.lastJump = 'now';
            this.timeoutId = setTimeout(() => {
                this.jump();
                this.lastJump = 'last';
              }, 5000);
        }      
    }


    animateMathRandom(){
        this.animateMathRandomIsRun = true;
        this.mathInterval = setInterval(() => {
            let number = Math.random();
            if (number < 0.75) {
                this.endBossGoAttack = true;
                this.moveZoneX = 325;
                this.speed = 6.5;
                this.startMoveInterval(5.5);
            } else {
                this.walkAnimate = true;
                this.moveZoneX = 225;
                this.speed = 4;
                this.startMoveInterval(4);
            } 
        }, 13000);
    }
}