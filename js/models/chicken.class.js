class Chicken extends MovableObject{
    world;
    y = 355;
    width = this.width * 0.8;
    height= this.height * 0.8;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    enemyIsDead = false;
    isJumped = false;
    isHit = false;

    chicken_sound = new Audio('audio/chicken.mp3');
    

    /**
     * collisionbox is a box with offset. This is required for isColliding()
     */
    collisionBoxOffsetY = 25;
    collisionBoxOffsetX = 3;
    collisionBoxWidth = this.width - 10;
    collisionBoxHeight = this.height - 20;


    /**
     * Constuctor Class Cicken
     * 
     * @param {number} offset - is the value of x to placed the new Chicken forward
     */
    constructor(offset){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.chicken_sound.volume = 0.35;
        this.x = offset +200 + Math.random() * 500;
        this.speed = 0.25 + Math.random() * 0.6;
    
        this.animate();
    }

    
    /**
     * Intervals for the Chicken Moves and for the animation of images are defined in animate()
     */
    animate() {
        this.moveInterval = setInterval(() =>{
            this.moveLeft();
        }, 1000 / 60);
        this.pushIntervalToArray(this.moveInterval);
        
        this.animationInterval = setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        this.pushIntervalToArray(this.animationInterval);
    }

}

