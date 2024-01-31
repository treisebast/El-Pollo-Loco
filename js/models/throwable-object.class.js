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

     splashHeight = 180;
     splashWidth = 235;
 
     rotationHeight = 100;
     rotationWidth = 70;

     collisionBoxOffsetY = 20;
     collisionBoxOffsetX = 15;
     collisionBoxWidth = 40;
     collisionBoxHeight = 60;


     isBrokenBottle = false;

    constructor(x, y, speed){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = this.rotationHeight;
        this.width = this.rotationWidth;
        this.throw(speed);
    }

    throw(speed){

        this.speedY = 27;
        this.applyGravity();
        
        let throwDirection = MovableObject.throwOtherDirection;

        this.lastInt = setInterval(() => {
            if (throwDirection === false && !this.isBrokenBottle) {
                this.x += (speed + 12);
                this.playAnimation(this.IMAGES_ROTATION);
            } else if (throwDirection === true && !this.isBrokenBottle) {
                this.x -= (speed + 12);
                this.playAnimation(this.IMAGES_ROTATION);
            } else if (this.isBrokenBottle === true) {
                this.height = this.splashHeight;
                this.width = this.splashWidth;
                this.playAnimationLastPic(this.IMAGES_SPLASH);
            }
    
        }, 60)
    }
}