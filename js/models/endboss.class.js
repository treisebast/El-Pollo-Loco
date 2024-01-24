class Endboss extends MovableObject{
    world;
    height = this.height * 4.16;
    width = this.width * 4;
    y = 35;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    collisionBoxOffsetY = 60;
    collisionBoxOffsetX = 10;
    collisionBoxWidth = this.width - 20;
    collisionBoxHeight = this.height - 80;

    enemyIsDead = false;


    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 3000;
        
        this.animate();
    }


   animate() {
        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}