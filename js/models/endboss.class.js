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
    lastJump = false;
    lastJumpTime = 0;

    moveZoneX = 125;
    hadFirstContact = false;
    endBossGoAttack = false;
    walkAnimate = true;
    attackAnimate = false;

    endBossIsDead = false;
    gameOver = false;
    energy = 100; //TODO: auf 100 ändern
    immune = false;

    pausedInterval = false;
    timeIsBeginHurt = false;
    beginnAtTimeHurt = 0;

    timeIsBeginRandom = false;
    beginnAtTimeRandom = 0;
    

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
            if (this.walkAnimate && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALK);
            } else if (this.attackAnimate && !this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isHurt() && !this.isDead()) {
                this.isHurtAnimation();
            } else if (this.isDead()) {
                this.isHurtAnimation();
                if ((new Date().getTime() - this.lastHit) > 1800) {
                    this.deadAnimation();
                }
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
            this.createTimeOut('timeIsBeginHurt', 1200, 'beginnAtTimeHurt'); 
            this.createTimeOut('timeIsBeginRandom', 4000, 'beginnAtTimeRandom'); 

        }, 150);
        this.pushIntervalToArray(this.animationInterval);
        this.startMoveInterval(2.5);
    }


    isHurtAnimation(){
        this.pausedInterval = true;
        this.playAnimation(this.IMAGES_HURT);
        this.createTimeBeginn('timeIsBeginHurt', 'beginnAtTimeHurt');         
    }






    // createTimeBeginn(){
    //     if (!this.timeIsBeginn) {
    //         this.timeIsBeginn = true;
    //         this.beginnTime = new Date().getTime();
    //     } 
    // }

    // createTimeOut(x){
    //     let timePassed = ((new Date().getTime()) - this.beginnTime);
    //     if (timePassed >= x && timePassed < 10000) {
    //         this.timeIsBeginn = false;
           
    //         this.pausedInterval = false; 
    //     }
    // }




    // Funktioniert soweit

    createTimeBeginn(variable, timeVariable){
        if (!this[variable]) {
            this[variable] = true;
            this[timeVariable] = new Date().getTime();
        } 
    }

    createTimeOut(variable, duration, timeVariable){
        let timePassed = ((new Date().getTime()) - this[timeVariable]);
        // console.log(this[variable]);
        if (timePassed >= duration && this[variable]) {
            this[variable] = false;

            if (variable === 'timeIsBeginHurt') {
            this.pausedInterval = false;   
            } else if (variable === 'timeIsBeginRandom') {
            this.animateMathRandom();
            }
        }
    }

    // Funktioniert in beiden Fällen





    startMoveInterval(speed){
        this.moveInterval = setInterval(() => {
            // console.log(this.pausedInterval);
            if (!this.pausedInterval) {
                if (this.world?.character.x > 800 && this.walkAnimate || this.hadFirstContact) {
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
    

    moveWithinZoneEndboss(speed) {   
       if (this.x > this.startPositionEndboss - this.moveZoneX && !this.otherDirection) {
            this.walkAnimate = true;
            this.moveLeft();
            if (this.x <= this.startPositionEndboss - this.moveZoneX + 35 && this.endBossGoAttack) {
                this.speed = 0.18;
                this.moveLeftSlow();
                this.walkAnimate = false;
                this.attackAnimate = true;
            }          
            if (this.x <= this.startPositionEndboss - this.moveZoneX) {
                this.walkAnimate = true;
                this.attackAnimate = false;
                this.otherDirection = true;
                this.endBossGoAttack = false;
            }

        } else if (this.x < this.startPositionEndboss && this.otherDirection) {
            this.speed = speed;
            this.moveRight();
            if (this.x >= this.startPositionEndboss) {
                this.otherDirection = false;
                this.walkAnimate = false;
                clearInterval(this.moveInterval);

                this.createTimeBeginn('timeIsBeginRandom', 'beginnAtTimeRandom');         
                


                // this.timeoutIdMathRandom = setTimeout(() => {
                //     this.animateMathRandom();
                // }, 5000); 
            }
        }
    }


    animateMathRandom(){
        this.animateMathRandomIsRun = true;
        let number = Math.random();
        if (number < 0.8) {
            this.endBossGoAttack = true;
            this.moveZoneX = 250;
            this.speed = 15;
            if (!this.isDead()) {
                this.startMoveInterval(5);
            }
        } else if (number >= 0.8) {
            this.walkAnimate = true;
            this.endBossGoAttack = false;
            this.moveZoneX = 225;
            this.speed = 7.5;
            if (!this.isDead()) {
                this.startMoveInterval(7.5);
            }
            
        }      
    }


    pushIntervalToArray(id){
        setStoppableInterval(id);
    }
}