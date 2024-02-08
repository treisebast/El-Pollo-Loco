class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;


    /**
     * Constructor Class Cloud
     * 
     * @param {string} imagePath - path for the Image of the Cloud
     * @param {number} x - number to place the Cloud in this game
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);

        this.x = x ;
        this.speed = 0.15 + Math.random() * 0.4;
        
        this.animate();
    }


    /**
     * Intervals for the Cloud Moves are defined in animate()
     */
    animate() {
        this.animationInterval = setInterval(() => {
            this.moveLeft();
            if (this.x < -this.width) {
                this.x = 3000;
            }
        }, 1000 / 40);
        this.pushIntervalToArray(this.animationInterval);
    }

}

