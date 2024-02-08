class EndbossStatusBar extends DrawableObject{

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 100;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 5;
        this.width = 205;
        this.height = 50;
        this.setPercentage(100);
    }

    
    /**
     * Images Lifepoints Endboss
     * 
     * @param {number} percentage - Images for the Lifepoints from the Endboss
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Return the right Picture for the Lifepoints
     * 
     * @returns - the right Image for the Lifepoints
     */
    resolveImageIndex(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}