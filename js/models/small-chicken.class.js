class SmallChicken extends Chicken{
    y = 360;
    width = this.width * 0.75;
    height= this.height * 0.75;

    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    startPositionChicken;
    currentPositionInZone;
    lastJump = 'last';

    collisionBoxOffsetY = 3;
    collisionBoxOffsetX = 3;
    collisionBoxWidth = this.width - 10;
    collisionBoxHeight = this.height - 10;



    constructor(offset){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = Math.min(offset + 300 + Math.random() * 400, 3700);
        this.speed;

        this.startPositionChicken = offset;
        this.currentPositionInZone = offset;

        this.applyGravity();
        this.animate();
        
    }

    
    animate() { 
        setInterval(() => {
            this.moveWithinZone();
            this.checkAndPerformJump();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }


    moveWithinZone() {
        const leftBoundary = this.startPositionChicken - 500;
        const rightBoundary = this.startPositionChicken;
    
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
            setTimeout(() => {
                this.jump();
                this.lastJump = 'last';
              }, 4000);
        }      
    }
}