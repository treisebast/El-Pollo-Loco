class CollectedBottle extends DrawableObject {
    
    IMAGE_BOTTLE = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];

    collectedBottles = [1,1,1,1,1,1];


    constructor(){
        super();
        this.loadImage(this.IMAGE_BOTTLE);
        this.x = 20;
        this.y = 115;
        this.width = 60;
        this.height = 60;

    }

    draw(ctx){
        super.draw(ctx);

        ctx.font = 'bolder 32px Risque, serif';
        ctx.fillStyle = 'white';
        this.text = "x " + this.collectedBottles.length;
        ctx.fillText(this.text, this.x + 55, this.y + 40);
    }
}