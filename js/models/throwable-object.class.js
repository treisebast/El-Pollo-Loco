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

     splashHeight = 120;
     splashWidth = 100;
 
     rotationHeight = 100;
     rotationWidth = 70;


    constructor(x, y, speed){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = x;
        this.y = y;
        this.height = this.rotationHeight;
        this.width = this.rotationWidth;
        this.throw( speed);
    }

    throw(speed){

        this.speedY = 27;
        this.applyGravity();

        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
            this.x += (speed + 12);
           
        }, 60)
    }
}