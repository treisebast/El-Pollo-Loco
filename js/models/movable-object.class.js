class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    static throwOtherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    currentImageLastPic = 0;
    deadAnimationBeginn = 0;


    setThrowOtherDirection(value) {
        MovableObject.throwOtherDirection = value;
    }


    applyGravity(){
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 55)
        this.pushIntervalToArray(this.gravityInterval);
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
            this.speedY = 18;
        } else if (this instanceof Character) {
            this.speedY = 25;
        } else if (this instanceof Endboss) {
            this.speedY = 13;
        } 
    }


    createTimeJumpBeginn() {
        if (!this.lastJump) {
            this.lastJump = true;
            this.lastJumpTime = new Date().getTime();
        }      
    }

    // x = number
    createTimeoutJump(x){
        let timePassed = ((new Date().getTime()) - this.lastJumpTime);
        if (timePassed >= x && this.lastJump) {
            this.jump();
            this.lastJump = false;
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
            this.stopInterval();
            setTimeout(() => {
                this.gameOver = true;
                this.world?.endScreen();
            }, 300);
        }
    }


    stopInterval() {
        clearInterval(this.lastInt);
    }


    deadAnimation(){
        this.deadAnimationBeginn = new Date().getTime();
        this.stopAnimations();
        this.world.keyboard = false;
        this.lastInt = setInterval(() => {
        this.playAnimationLastPic(this.IMAGES_DEAD);
        }, 150); 
        this.pushIntervalToArray(this.lastInt);  
    }


    stopAnimations() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }

    pushIntervalToArray(id){
        setStoppableInterval(id);
    }
}