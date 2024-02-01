class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    static throwOtherDirection = false;
    speedY = 0;
    acceleration = 2.1;
    energy = 100;
    lastHit = 0;
    currentImageLastPic = 0;
    deadAnimationBeginn = 0;


    setThrowOtherDirection(value) {
        MovableObject.throwOtherDirection = value;
    }


    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 50)
    }


    isAboveGround(){
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else if (this instanceof SmallChicken) {
            return this.y < 357;
        } else if (this instanceof Endboss) {
            return this.y < 35;
        } else {
            return this.y < 220;
        }
    }


    isJumpOnEnemie(chicken) {
        let characterBottom = this.y + this.collisionBoxOffsetY + this.collisionBoxHeight + 10;
        let chickenTop = chicken.y - 8 + chicken.collisionBoxOffsetY;
        let horizontalOverlap = this.x + this.collisionBoxOffsetX < chicken.x + chicken.collisionBoxOffsetX + chicken.collisionBoxWidth &&
            this.x + this.collisionBoxOffsetX + this.collisionBoxWidth > chicken.x + chicken.collisionBoxOffsetX;  
            
        if (characterBottom >= chickenTop && horizontalOverlap) {
            let horizontalOverlapWidth = Math.min(this.x + this.collisionBoxOffsetX + this.collisionBoxWidth, chicken.x + chicken.collisionBoxOffsetX + chicken.collisionBoxWidth) -
                                        Math.max(this.x + this.collisionBoxOffsetX, chicken.x + chicken.collisionBoxOffsetX);
            if (horizontalOverlapWidth > 0) {
                return horizontalOverlapWidth;
            }
        }
        return 0; 
    }


    isColliding(obj) {
        let thisRight = this.x + this.collisionBoxOffsetX + this.collisionBoxWidth;
        let thisBottom = this.y + this.collisionBoxOffsetY + this.collisionBoxHeight;
        let objRight = obj.x + obj.collisionBoxOffsetX + obj.collisionBoxWidth;
        let objBottom = obj.y + obj.collisionBoxOffsetY + obj.collisionBoxHeight;
    
        return (
            thisRight >= obj.x + obj.collisionBoxOffsetX &&
            this.x + this.collisionBoxOffsetX <= objRight &&
            thisBottom >= obj.y + obj.collisionBoxOffsetY &&
            this.y + this.collisionBoxOffsetY <= objBottom
        );
    }


    hit(){
        if (!this.immune) {
            this.immune = true;
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
            setTimeout(() => {
                this.immune = false;
            }, 1200);
        }
    }


    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1.2;
    }


    isDead(){
        return this.energy == 0;
    }


    moveRight(){
        this.x += this.speed;
    }


    moveLeft(){
        this.x -= this.speed;
    }


    moveLeftSlow(){
        this.x -= this.speed;
    }


    jump() {
        if (this instanceof SmallChicken) {
            this.speedY = 17;
        } else if (this instanceof Character) {
            this.speedY = 25;
        } else if (this instanceof Endboss) {
            this.speedY = 15;
        } 
    }


    playAnimation(images){
        let i = this.currentImage % images.length; // % bedeutet Modulo => mit Rest wird gerechnet
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    playAnimationLastPic(images) {
        let i = this.currentImageLastPic % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageLastPic++;
        if (this.currentImageLastPic === images.length) {
            if (this.timeTillGameOver()) {
                this.gameOver = true;
                this.world.endScreen();
                this.stopInterval();
            }
        }
    }


    stopInterval() {
        clearInterval(this.lastInt);
    }


    timeTillGameOver(){
        let timepassed = new Date().getTime() - this.deadAnimationBeginn; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 3.5;
    }


    deadAnimation(){
        this.deadAnimationBeginn = new Date().getTime();
        this.stopAnimations();
        this.world.keyboard = false;
        this.lastInt = setInterval(() => {
        this.playAnimationLastPic(this.IMAGES_DEAD);
        }, 200);   
    }


    stopAnimations() {
        clearTimeout(this.timeoutIdMathRandom);
        clearTimeout(this.timeoutId);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}