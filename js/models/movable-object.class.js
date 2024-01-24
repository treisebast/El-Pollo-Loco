class MovableObject extends DrawalbleObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;


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
            return this.y < 370;
        } else {
            return this.y < 220;
        }
    }


    isJumpOnEnemie(chicken) {
        let characterBottom = this.y + this.collisionBoxOffsetY + this.collisionBoxHeight + 5;
        let chickenTop = chicken.y - 5 + chicken.collisionBoxOffsetY;
        let horizontalOverlap = this.x + this.collisionBoxOffsetX < chicken.x + chicken.collisionBoxOffsetX + chicken.collisionBoxWidth &&
            this.x + this.collisionBoxOffsetX + this.collisionBoxWidth > chicken.x + chicken.collisionBoxOffsetX;
    
        if (characterBottom >= chickenTop && horizontalOverlap) {
            return true;
        }
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
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
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


    jump() {
        if (this instanceof SmallChicken) {
            this.speedY = 17;
        } else {
            this.speedY = 20; //JumpHeight
        }  
    }


    playAnimation(images){
        let i = this.currentImage % images.length; // % bedeutet Modulo => mit Rest wird gerechnet
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    stopAnimations() {
        clearTimeout(this.timeoutId);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}