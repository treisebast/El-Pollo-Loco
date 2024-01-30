class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    collectedCoin = new CollectedCoin();
    collectedBottle = new CollectedBottle();
    endBossStatusBar = new EndbossStatusBar();
    throwableObjects = [];

    breakpoint = 350;
    offset= 350;

    IMAGES_DEAD;
      



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();

        this.setWorld(this.character);
        this.level.enemies.forEach((enemy) =>{
            this.setWorld(enemy);
        });
        this.setWorld(this.level.endBoss[0]);
 
        this.run();
    }

    
    setWorld(obj) {
        obj.world = this;
     }


    run(){
        setInterval(() =>{
            this.checkJumpOnChicken();
            this.checkCollisions(['endBoss', 'enemies']);
            this.checkThrowObjects();
            this.checkCollectedItems();
        }, 25)
    }


    checkThrowObjects(){
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);        
        }
    }


    checkJumpOnChicken() {
        if (!this.level.enemies.isJumped && this.character.y < 200 && this.character.speedY < 0) {
            let maxHorizontalOverlap = 0;
            let selectedChicken = null; 
            this.level.enemies.forEach((enemy) => {
                let horizontalOverlap = this.character.isJumpOnEnemie(enemy);
                if (horizontalOverlap > maxHorizontalOverlap) {
                    maxHorizontalOverlap = horizontalOverlap;
                    selectedChicken = enemy;
                }
            });
            if (selectedChicken !== null) {
                selectedChicken.isJumped = true;
                this.enemyDeadAnimation(selectedChicken);
            }
        }
    }


    enemyDeadAnimation(enemy) {
        if (!enemy.enemyIsDead) {
            enemy.stopAnimations();
            this.character.jump();
            enemy.enemyIsDead = true;
            this.IMAGES_DEAD = enemy.IMAGES_DEAD;
            enemy.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                if (enemy.enemyIsDead) {
                    let index = this.level.enemies.indexOf(enemy);
                    if (index !== -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }
            }, 350);
        }
    }


    checkCollisions(enemies){
        enemies.forEach((e) =>{
            this.level[e].forEach((enemy) => {
                if (!enemy.isJumped || !this.level.endBoss.endBossIsDead){
                    if (this.character.isColliding(enemy) && !enemy.enemyIsDead ) {
                        if (!(enemy instanceof Endboss)) {
                            this.character.isHurtCharacter = true;
                        } else {
                            this.character.isHurtCharacter = false;
                        }
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            })
        })             
    }


    checkCollectedItems(){
        this.level.placedItems.forEach((item) => {
            if (this.character.isColliding(item)) {
                console.log(item);
                if (item instanceof Coins) {
                    this.collectedCoin.collectedCoins.push(item);
                    this.deletePlacedItems(item);
                } else {
                    this.collectedBottle.collectedBottles.push(item);
                    this.deletePlacedItems(item);
                }
            }           
        })                
    }


    deletePlacedItems(item){
        let index = this.level.placedItems.indexOf(item);
        if (index !== -1) {
            this.level.placedItems.splice(index, 1);
        }
    }


    createNewChickenIfNecessary() {
        if (this.character.x > this.breakpoint) {
            this.breakpoint += this.offset;
            let isChicken = Math.random() > 0.33;
            let newChicken = isChicken ? new Chicken(this.breakpoint) : new SmallChicken(this.breakpoint);
            this.setWorld(newChicken);
            this.level.enemies.push(newChicken);
        }
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.placedItems);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        
        //------------ Space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.endBossStatusBar);
        this.addToMap(this.collectedCoin);
        this.addToMap(this.collectedBottle);

        // this.ctx.translate(this.camera_x, 0);
        // this.ctx.translate(-this.camera_x, 0);

        this.createNewChickenIfNecessary();

        //Draw() wird immer wieder aufgerufen
        setTimeout(() => {
            requestAnimationFrame(() => this.draw());
        }, 20);
    }


    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    //TODO: Weiter GameOverScreen
    // endscreen(){
    //     document.getElementById('canvas').style = 'display: none';
    //     handleGameEnd();
    // }

}
