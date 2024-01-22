class Level {
    enemies;
    clouds;
    backgroundObjects;
    endBoss;
    level_end_x = 3600;
    world2;
    

    constructor(chickens, endBoss, clouds, backgroundObjects){
        this.enemies = chickens;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }


    
}