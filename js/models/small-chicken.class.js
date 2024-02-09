class SmallChicken extends MovableObject{
    world;
    y = 358;
    width = this.width * 0.6;
    height= this.height * 0.6;

    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    lastJump = false;
    lastJumpTime = 0;

    enemyIsDead = false;
    isJumped = false;
    isHit = false;


    /**
     * collisionbox is a box with offset. This is required for isColliding()
     */
    collisionBoxOffsetY = 10;
    collisionBoxOffsetX = 3;
    collisionBoxWidth = this.width - 10;
    collisionBoxHeight = this.height - 10;

    chicken_sound = new Audio('audio/smallChicken.mp3');


    /**
     * Constructor from class SmallChicken
     * 
     * @param {number} offset - offset for the X-position in the game
     */
    constructor(offset){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = Math.min(offset + 300 + Math.random() * 400, 3700);
        this.speed = 1.4 + Math.random() * 0.4;

        this.applyGravity();
        this.animate();
    }

    
    /**
     * Animation and move intervals
     */
    animate() { 
        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.createTimeJumpBeginn();
            this.createTimeoutJump(3500);
        }, 1000 / 25);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
        this.pushIntervalToArray(this.moveInterval);
        this.pushIntervalToArray(this.animationInterval);
    }

}