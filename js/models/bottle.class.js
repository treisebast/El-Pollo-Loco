class Bottles extends MovableObject{
    height = 100;
    width = 100;

    collisionBoxOffsetY = 37;
    collisionBoxOffsetX = 45;
    collisionBoxWidth = this.width - 80;
    collisionBoxHeight = this.height - 55;

    bottle_sound = new Audio('audio/bottle.mp3');

    // BOTTLE_IMAGES =[
    //     'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    //     'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    // ];

    constructor(img, x, y){
        super().loadImage(img);
        // this.loadImages(this.BOTTLE_IMAGES);
        this.x = x;
        this.y = y;
    }

}