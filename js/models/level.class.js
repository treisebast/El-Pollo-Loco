class Level {
    enemies;
    clouds;
    backgroundObjects;
    endBoss;
    level_end_x = 3600;
    placedItems;
    

    constructor(chickens, endBoss, placedItems, clouds, backgroundObjects){
        this.enemies = chickens;
        this.endBoss = endBoss;
        this.placedItems = placedItems;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }


    
}