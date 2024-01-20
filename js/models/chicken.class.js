class Chicken extends MovableObject{
    y = 355;
    width = this.width * 0.75;
    height= this.height * 0.75;
    IMAGES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    

    constructor(offset){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = offset + 250 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.4;
        
        this.animate();
    }


    animate() {
        setInterval(() =>{
            this.moveLeft();
        }, 1000 / 60);
        

        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}