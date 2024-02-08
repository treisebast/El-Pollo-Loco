class Coins extends MovableObject{
    height = 100;
    width = 100;

    COIN_IMAGES =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    coin_sound = new Audio('audio/coin.mp3');

    /**
     * collisionbox is a box with offset in X, Y, width and height. This is required for isColliding()
     */
    collisionBoxOffsetY = 35;
    collisionBoxOffsetX = 35;
    collisionBoxWidth = this.width - 70;
    collisionBoxHeight = this.height - 70;


    /**
     * Constructor Class Coin
     * 
     * @param {number} x - number for positioning in the game
     * @param {number} y - number for positioning in the game
     */
    constructor(x, y){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;

        this.animate();
    }


    /**
     * Intervals for the animation of images are defined in animate()
     */
    animate(){
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);  
        }, 500);
        this.pushIntervalToArray(this.animationInterval);
    }

}