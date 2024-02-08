class CollectedCoin extends DrawableObject {

    IMAGE_COIN = ["img/7_statusbars/3_icons/icon_coin.png"];

    collectedCoins = [];


    constructor() {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 20;
        this.y = 55;
        this.width = 55;
        this.height = 55;
    }
    

    /**
     * Draws the collected bottle count on the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = "bolder 32px Risque, serif";
        ctx.fillStyle = "white";
        this.text = "x " + this.collectedCoins.length;
        ctx.fillText(this.text, this.x + 55, this.y + 40);
    }
}
