const level1 = new Level(
    enemies= [new Chicken(650), new Chicken(700)],
    [new Endboss()],
    cloud = [],
    backgroundObjects = [],
    createCloudObjects(),
    createBackgroundObjects()
);


function createCloudObjects() {
    let repetitions = 8;
    let offset = 420;
    for (let i = 0; i < repetitions; i += 2) {
        this.cloud.push(
            new Cloud("img/5_background/layers/4_clouds/1.png", i * (offset)),
            new Cloud("img/5_background/layers/4_clouds/2.png", (i + 1) * offset),
        );
    }
}


function createBackgroundObjects() {
    let repetitions = 6;
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