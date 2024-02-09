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


    /**
     * throw bottle Left or Right with character
     * 
     * @param {boolean} boolean - when the character goes right or left
     */
    setThrowOtherDirection(boolean) {
        MovableObject.throwOtherDirection = boolean;
    }


    /**
     * Gravity
     */
    applyGravity(){
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 55)
        this.pushIntervalToArray(this.gravityInterval);
    }


    /**
     * Over the underground
     * 
     * @returns true or value for the Movableobjects for the Y-position
     */
    isAboveGround(){
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else if (this instanceof SmallChicken) {
            return this.y < 352;
        } else if (this instanceof Endboss) {
            return this.y < 35;
        } else {
            return this.y < 220;
        }
    }


    /**
     * Check character is jump on enemy
     * 
     * @param {object} chicken - enemy object
     * @returns - return enemy, when the character jump on it
     */
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


    /**
     * Check colliding between character and enemy
     * 
     * @param {object} obj - enemy object
     * @returns - when the character is colliding with enemy - true
     */
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

    /**
     * Character or Enemie have a damage
     */
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
            }, 1000);
        }
    }


    /**
     * when the character or endboss is damage, than returns true
     * 
     * @returns true
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }


    /**
     * Someone is dead
     * 
     * @returns - someone is dead
     */
    isDead(){
        return this.energy == 0;
    }


    /**
     * to move right
     */
    moveRight(){
        this.x += this.speed;
    }


    /**
     * to move left
     */
    moveLeft(){
        this.x -= this.speed;
    }


    /**
     * Slowpart endboss, when he attacks
     */
    moveLeftSlow(){
        this.x -= this.speed;
    }


    /**
     * Jump
     */
    jump() {
        if (this instanceof SmallChicken) {
            this.speedY = 24;
        } else if (this instanceof Character) {
            this.speedY = 21;
        } else if (this instanceof Endboss) {
            this.speedY = 15;
        } 
    }


    /**
     * for Jump() setTimeout beginn
     */
    createTimeJumpBeginn() {
        if (!this.lastJump) {
            this.lastJump = true;
            this.lastJumpTime = new Date().getTime();
        }      
    }

    /**
     * for Jump() setTimeout end with duration
     * 
     * @param {number} x - number in milliseconds for the duration
     */
    createTimeoutJump(x){
        let timePassed = ((new Date().getTime()) - this.lastJumpTime);
        if (timePassed >= x && this.lastJump) {
            this.jump();
            this.lastJump = false;
        }
    }


    /**
     * Animation with images
     * 
     * @param {path} images - images from character, endboss, ememie, cloud, coins etc.
     */
    playAnimation(images){
        let i = this.currentImage % images.length; // % bedeutet Modulo => mit Rest wird gerechnet
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Dead from character or endboss - the last animation
     * 
     * @param {path} images - images from character, endboss, ememie, cloud, coins etc.
     */
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


    /**
     * Stop the interval from deadAnimation()
     */
    stopInterval() {
        clearInterval(this.lastInt);
    }


    /**
     * Dead from character or endboss
     */
    deadAnimation(){
        this.deadAnimationBeginn = new Date().getTime();
        this.stopAnimations();
        this.world.keyboard = false;
        this.lastInt = setInterval(() => {
        this.playAnimationLastPic(this.IMAGES_DEAD);
        }, 150); 
        this.pushIntervalToArray(this.lastInt);  
    }


    /**
     * Stop Intervals
     */
    stopAnimations() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
    

    /**
     * Play or pause Audiosound
     * 
     * @param {variable} sound - variable from the Audiosound, who will play or pause
     * @param {string} paused - string assumes the certain value for pause
     */
    playSound(sound, paused){
        togglePlaySound(sound, paused);
    }


    /**
     * Push intervals to a Array - allInterval = []
     * 
     * @param {variable} id - id from the intervals; push with: this.pushIntervalToArray(this.lastInt);
     */
    pushIntervalToArray(id){
        setStoppableInterval(id);
    }
}