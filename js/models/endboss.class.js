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


    collisionBoxOffsetY = 70;
    collisionBoxOffsetX = 30;
    collisionBoxWidth = this.width - 40;
    collisionBoxHeight = this.height - 90;

    startPositionEndboss = 1200;
    lastJump = 'last';

    moveZoneX = 125;
    enemyIsDead = false;
    hadFirstContact = false;
    

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
    

    endBossGoAttack = false;
    walkAnimate = true;
    attackAnimate = false;
    moveWithinZoneEndboss(speed) {   
       if (this.x > this.startPositionEndboss - this.moveZoneX && !this.otherDirection) {
            this.walkAnimate = true;
            this.moveLeft();
            if (this.x <= this.startPositionEndboss - this.moveZoneX + 35 && this.endBossGoAttack) {
                this.speed = 0.2;
                this.moveLeftSlow();
                this.walkAnimate = false;
                this.attackAnimate = true;
            }          
            if (this.x <= this.startPositionEndboss - this.moveZoneX) {
                this.walkAnimate = true;
                this.attackAnimate = false;
                this.otherDirection = true;
                this.endBossGoAttack = false;
                // this.walkAnimate = true;
            }


        } else if (this.x < this.startPositionEndboss && this.otherDirection) {
            this.speed = speed;
            this.moveRight();
            if (this.x >= this.startPositionEndboss) {
                this.otherDirection = false;
                this.walkAnimate = false;
                clearInterval(this.moveInterval);
                console.log(this.otherDirection);
                console.log(this.walkAnimate);

                setTimeout(() => {
                    this.animateMathRandom();
                    // this.startMoveInterval(2.5);
                    console.log('es wurde unterbrochen');
                }, 5000); 
            }
        }
    }


    checkAndPerformJump() {
        if (this.lastJump === 'last' && !this.endBossGoAttack) {
            this.lastJump = 'now';
            this.timeoutId = setTimeout(() => {
                this.jump();
                this.lastJump = 'last';
              }, 3000);
        }      
    }


    animateMathRandom(){
        this.animateMathRandomIsRun = true;
        let number = Math.random();
        if (number < 0.75) {
            console.log('erstes animationMathRandomInterval');

            this.endBossGoAttack = true;
            this.moveZoneX = 325;
            this.speed = 10;
            this.startMoveInterval(5.5);
        } else if (number >= 0.75) {
            console.log('zweites animationMathRandomInterval');

            this.walkAnimate = true;
            this.moveZoneX = 225;
            this.speed = 4;
            this.startMoveInterval(4);
        }      
    }
}