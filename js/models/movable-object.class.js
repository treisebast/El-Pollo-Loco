class MovableObject {
    x = 120;
    y = 280;
    img;
    height= 100;
    width= 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;


    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
        }, 25)
    }


    isAboveGround(){
        return this.y < 230;
    }


    // loadImage('img/test.png');
    loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }


    moveRight(){
        this.x += this.speed;
    }


    moveLeft(){
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 20; //JumpHeight
    }


    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; // % bedeutet Modulo => mit Rest wird gerechnet
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}