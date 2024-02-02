class Coins extends MovableObject{
    height = 100;
    width = 100;

    collisionBoxOffsetY = 35;
    collisionBoxOffsetX = 35;
    collisionBoxWidth = this.width - 70;
    collisionBoxHeight = this.height - 70;


    COIN_IMAGES =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    
    constructor(x, y){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;

        this.animate();
    }


    animate(){
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);  
        }, 500);
        this.pushIntervalToArray(this.animationInterval);
    }

    
    pushIntervalToArray(id){
        setStoppableInterval(id);
    }
}