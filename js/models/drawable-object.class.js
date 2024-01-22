class DrawalbleObject {
    x = 120;
    y = 280;
    height= 100;
    width= 100;
    img;
    imageCache = {};
    currentImage = 0;

    collisionBoxOffsetY; 
    collisionBoxOffsetX;
    collisionBoxWidth;
    collisionBoxHeight;

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


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.collisionBoxOffsetX, this.y + this. collisionBoxOffsetY, 
                this.collisionBoxWidth, this.collisionBoxHeight);
            ctx.stroke();
        } 
    }


}