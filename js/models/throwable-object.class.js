class ThrowableObject extends MovableObject{
    world;

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    isBrokenBottle = false;
    isBrokenBottleOnEnemy = false;
    attackEndboss = false;

    throw_sound = new Audio('audio/throw.mp3');
    break_sound = new Audio('audio/glass.mp3');


    /**
     * collisionbox is a box with offset. This is required for isColliding()
     */
    collisionBoxOffsetY = 20;
    collisionBoxOffsetX = 15;
    collisionBoxWidth = 40;
    collisionBoxHeight = 60;


    /**
     * Size of the Images for the Animation
     */
    splashHeight = 180;
    splashWidth = 235;
    splashHeightOnEnemy = 85;
    splashWidthOnEnemy = 111;

    rotationHeight = 100;
    rotationWidth = 70;


    /**
     * Constructor from Class Throwableobject
     * 
     * @param {number} x - number for the X-position to throw the bottle
     * @param {number} y - number for the Y-position to throw the bottle
     * @param {number} speed - number for the speed to throw the bottle
     */
    constructor(x, y, speed){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = this.rotationHeight;
        this.width = this.rotationWidth;
        this.speed = speed;
        this.speedY = 21;

        this.applyGravity();
        this.throw();
    }


    /**
     * Animation interval of throw bottle
     */
    throw(){
        let throwDirection = MovableObject.throwOtherDirection;

        this.lastInt = setInterval(() => {
            this.throwAndAnimateBottle(throwDirection); 
        }, 60)
        this.pushIntervalToArray(this.lastInt);
    }


    /**
     * Aniamtion of throw bottle and break bottle
     * 
     * @param {boolean} throwDirection - throw right or left from character
     */
    throwAndAnimateBottle(throwDirection){
        if (throwDirection === false && !this.isBrokenBottle) {
            this.x += (this.speed + 13);
            this.playAnimation(this.IMAGES_ROTATION);
        } else if (throwDirection === true && !this.isBrokenBottle) {
            this.x -= (this.speed + 13);
            this.playAnimation(this.IMAGES_ROTATION);
        } else if (this.isBrokenBottle === true && this.attackEndboss === true ) {
            this.height = this.splashHeight;
            this.width = this.splashWidth;
            this.playAnimationLastPic(this.IMAGES_SPLASH);
        } else if ( this.isBrokenBottleOnEnemy === true) {
            this.height = this.splashHeightOnEnemy;
            this.width = this.splashWidthOnEnemy;
            this.playAnimationLastPic(this.IMAGES_SPLASH);
        }
    }

}