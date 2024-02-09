class Level {
    enemies;
    clouds;
    backgroundObjects;
    endBoss;
    level_end_x = 3600;
    placedItems;
    

    /**
     * Creates a new level.
     * 
     * @param {Array<Enemy>} enemies - An array of enemy objects.
     * @param {Array<Endboss>} endBoss - An array containing the end boss object.
     * @param {Array<Item>} placedItems - An array of placed item objects.
     * @param {Array<Cloud>} clouds - An array of cloud objects.
     * @param {Array<BackgroundObject>} backgroundObjects - An array of background object objects.
     */
    constructor(chickens, endBoss, placedItems, clouds, backgroundObjects){
        this.enemies = chickens;
        this.endBoss = endBoss;
        this.placedItems = placedItems;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }


    
}