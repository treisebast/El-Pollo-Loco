class CollectableObjects extends MovableObject{
    height = 80;
    width = 80;

    COIN_IMAGES =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = 150;
        this.y = 150;

        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);  
        }, 500);
        
    }
    

}