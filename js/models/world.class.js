class World {
    requestAnimationFrame;
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    collectedCoinBar = new CollectedCoin();
    collectedBottleBar = new CollectedBottle();
    endBossStatusBar = new EndbossStatusBar();
    thrownBottle = [];
    bottle = new ThrowableObject();
    breakpoint = 350;
    offset= 350;

    IMAGES_DEAD;

    hasThrownBottle = false;


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
        this.setWorld(this.bottle);
        this.run();
    }

    
    setWorld(obj) {
        obj.world = this;
    }
    

    run(){
        this.runInterval = setInterval(() =>{
            this.checkJumpOnChicken();
            this.checkCollisions(['endBoss', 'enemies']);
            this.checkThrowObjects();
            this.checkCollisionThrowableObjekt();
            this.checkCollisionThrowableObjektOnEnemy();
            this.checkCollectedItems();
        }, 30)
        this.pushIntervalToArray(this.runInterval);
    }


    checkCollisionThrowableObjekt() {
        this.level.endBoss.forEach((endBoss) =>{
            this.thrownBottle.forEach((thrownBottle) => {
                if (!thrownBottle.isBrokenBottle && thrownBottle.isColliding(endBoss)) {
                    thrownBottle.playSound(thrownBottle.break_sound, '');
                    console.log(endBoss);
                    if (!(endBoss.immune)) {
                        endBoss.playSound(endBoss.chicken_hurt_sound, '');
                    }
                    endBoss.hit();
                    this.endBossStatusBar.setPercentage(endBoss.energy);
                    thrownBottle.isBrokenBottle = true;
                    thrownBottle.attackEndboss = true;                  
                }
            })                
        });  
    }

    
    checkCollisionThrowableObjektOnEnemy(){
        this.level.enemies.forEach((enemy) => {
            this.thrownBottle.forEach((thrownBottle) => {
                if (!thrownBottle.isBrokenBottle && !thrownBottle.isBrokenBottleOnEnemy && thrownBottle.isColliding(enemy)) {
                    thrownBottle.playSound(thrownBottle.break_sound, '');
                    enemy.isHit = true; 
                    thrownBottle.isBrokenBottle = true;
                    thrownBottle.isBrokenBottleOnEnemy = true;
                    this.enemyDeadAnimation(enemy);
                }
            });
        });
    }


    checkThrowObjects(){
        if (this.keyboard.D && this.collectedBottleBar.collectedBottles.length > 0 && !this.hasThrownBottle) {
            this.hasThrownBottle = true; 
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 80, this.character.speed);
            bottle.playSound(bottle.throw_sound, '');
            this.thrownBottle.push(bottle);
            this.collectedBottleBar.collectedBottles.pop();
            setTimeout(() => {
                this.hasThrownBottle = false;
            }, 800);
        }
        for (let i = this.thrownBottle.length - 1; i >= 0; i--) {
            if (this.thrownBottle[i].y > 550) {
                this.thrownBottle.splice(i, 1);
            }
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
            enemy.playSound(enemy.chicken_sound, '');
            enemy.stopAnimations();
            if (enemy.isJumped === true) {
                this.character.jump();
                this.character.playSound(this.character.jump_sound, '');
            }
            enemy.enemyIsDead = true;
            this.IMAGES_DEAD = enemy.IMAGES_DEAD;
            enemy.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                enemy.playSound(enemy.chicken_sound, 'paused');
            }, 1200);
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
                        if (!this.character.immune) {
                            this.character.playSound(this.character.hurt_sound, '');
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
                if (item instanceof Coins) {
                    item.playSound(item.coin_sound, '');
                    this.collectedCoinBar.collectedCoins.push(item);
                    this.deletePlacedItems(item);
                } else {
                    item.playSound(item.bottle_sound, '');
                    this.collectedBottleBar.collectedBottles.push(item);
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
        this.addObjectsToMap(this.thrownBottle);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        
        //------------ Space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.endBossStatusBar);
        this.addToMap(this.collectedCoinBar);
        this.addToMap(this.collectedBottleBar);

        this.createNewChickenIfNecessary();

        // repeat Draw() always
        let self = this;
        this.requestAnimationFrame = requestAnimationFrame(() => {
            self.draw()
        });
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


    pushIntervalToArray(id){
        setStoppableInterval(id);
    }
    

    endScreen(){
        if (this.level.endBoss[0].gameOver === true) {            
            handleGameEnd('youWin');
        } else if (this.character.gameOver === true) {
            handleGameEnd('youLose');
        } 
    }

}
