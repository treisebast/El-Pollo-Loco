class Level {
    enemies;
    clouds;
    backgroundObjects;
    endBoss;
    level_end_x = 2900;
    

    constructor(chickens, endBoss, clouds, backgroundObjects){
        console.log(endBoss);
        this.enemies = chickens;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }


    
}