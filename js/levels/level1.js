const level1 = new Level(
    enemies = [new Chicken(500), new SmallChicken(600)],
    endBoss =[new Endboss()],
    placedItems = [],
    cloud = [],
    backgroundObjects = [],
    createCloudObjects(),
    createBackgroundObjects(),
    createCoins(),
    createBottles()
);


function createCoins(){
    let repetitions = 7;
    let offset = 700;
    for (let i = 0; i < repetitions; i+=2) {
        this.placedItems.push(
            new Coins((i+1) * offset, 100),
            new Coins((i+1) * offset+75, 175),
            new Coins((i+1) * offset, 175),
            new Coins((i+1) * offset-75, 175),
            new Coins((i+1) * offset, 250),
            new Coins((i+2.3) * offset-125, 225),
            new Coins((i+2.3) * offset-75, 150),
            new Coins((i+2.3) * offset, 100),
            new Coins((i+2.3) * offset+75, 150),
            new Coins((i+2.3) * offset+125, 225)
        );
    }
}


function createBottles(){
    let repetitions = 7;
    let offset = 700;
    for (let i = 0; i < repetitions; i++) {
        this.placedItems.push(
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', (i+1) * offset, 350),
            new Bottles('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', (i+1) * offset + 150, 355),
            new Bottles('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', (i+1) * offset + 225, 335)
        )
    }
}


function createCloudObjects() {
    let repetitions = 9;
    let offset = 420;
    for (let i = 0; i < repetitions; i += 2) {
        this.cloud.push(
            new Cloud("img/5_background/layers/4_clouds/1.png", i * (offset)),
            new Cloud("img/5_background/layers/4_clouds/2.png", (i + 1) * offset),
        );
    }
}


function createBackgroundObjects() {
    let repetitions = 7;
    let offset = 719;
    let start_x = 719;
    for (let i = 0; i < repetitions; i += 2) {
        this.backgroundObjects.push(
            new BackgroundObject("img/5_background/layers/air.png", i * offset - start_x),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", i * offset - start_x),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", i * offset - start_x),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", i * offset - start_x),
            new BackgroundObject("img/5_background/layers/air.png", (i + 1) * offset - start_x),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", (i + 1) * offset - start_x),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", (i + 1) * offset - start_x),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", (i + 1) * offset - start_x)
        );
    }
}