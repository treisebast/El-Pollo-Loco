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
        'img/4_enemie_boss_chicken/3_attack/G20.png'
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
    currentPositionInZone = 1200;
    lastJump = 'last';

    enemyIsDead = false;
    hadFirstContact = false;


    constructor(){
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.speed = this.speed * 5;
        this.x = 1200; //TODO: wieder ändern
        // this.x = Math.min(offset + 300 + Math.random() * 400, 3700);
        this.applyGravity();
        this.animate();

    }


    animate() { 
        // this.moveInterval = setInterval(() => {
        //     this.moveWithinZone();
        //     this.checkAndPerformJump();
        // }, 1000 / 60);
        
        let i = 0;
        this.animationInterval = setInterval(() => {

            if (i < 10) {
                this.playAnimation(this.IMAGES_WALK);
                //TODO: Audio Endboskampf
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            } 

            i++;

            if (this.world.character.x > 700 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                Math.random()
            }
            
            
            // this.playAnimation(this.IMAGES_ATTACK);
            // this.playAnimation(this.IMAGES_HURT);
            // this.playAnimation(this.IMAGES_DEAD);
        }, 250);
    }


    moveWithinZone() {
        let leftBoundary = this.startPositionEndboss - 300;
        let rightBoundary = this.startPositionEndboss;
    
        if (this.currentPositionInZone > leftBoundary && !this.otherDirection) {
            this.moveLeft();
            this.currentPositionInZone -= this.speed;
            if (this.currentPositionInZone <= leftBoundary) {
                this.otherDirection = true;
            }
        } else if (this.currentPositionInZone < rightBoundary && this.otherDirection) {
            this.moveRight();
            this.currentPositionInZone += this.speed;
            if (this.currentPositionInZone >= rightBoundary) {
                this.otherDirection = false;
            }
        }
    }


    checkAndPerformJump() {
        if (this.lastJump === 'last') {
            this.lastJump = 'now';
            this.timeoutId = setTimeout(() => {
                this.jump();
                this.lastJump = 'last';
              }, 4000);
        }      
    }
}