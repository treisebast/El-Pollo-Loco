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
        }, 25)
    }


    isAboveGround(){
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
        return this.y < 230;
        }
    }


    //character.isColligding(chicken);
    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x && 
            this.y < mo.y + mo.height
    }

//     // character.isColligding(chicken); [Bessere Formel zur Kollisionsberechnung]
//     isColliding (obj) {
//         return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
//                 (this.Y + this.offsetY + this.height) >= obj.Y &&
//                 (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
//                 obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
// }


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
        this.speedY = 27; //JumpHeight
    }


    playAnimation(images){
        let i = this.currentImage % images.length; // % bedeutet Modulo => mit Rest wird gerechnet
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}