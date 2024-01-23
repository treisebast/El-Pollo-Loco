class Chicken extends MovableObject{
    world;
    y = 355;
    width = this.width * 0.75;
    height= this.height * 0.75;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    collisionBoxOffsetY = 3;
    collisionBoxOffsetX = 3;
    collisionBoxWidth = this.width - 10;
    collisionBoxHeight = this.height - 10;

    

    constructor(offset){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = offset +200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.4;
    
        this.animate();
    }


    animate() {
        this.moveInterval = setInterval(() =>{
            this.moveLeft();
        }, 1000 / 60);
        
        this.animationInterval = setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    stopAnimations() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}

