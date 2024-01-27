class CoinBar extends DrawableObject {

    IMAGE_COIN = [
        'img/7_statusbars/3_icons/icon_coin.png'
    ];

    coins = ['coin', 'coin'];

    constructor(){
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 20;
        this.y = 55;
        this.width = 55;
        this.height = 55;

        this.text = "x " + this.coins.length;
    }

    draw(ctx){
        super.draw(ctx);

        ctx.font = 'bolder 32px Risque, serif';
        ctx.fillStyle = 'white';

        ctx.fillText(this.text, this.x + 55, this.y + 40);
    }
}
