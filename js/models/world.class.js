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


    /**
     * Constructor from Class World - Represents a game controller.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
     * @param {KeyboardController} keyboard - The keyboard controller for user input.
     */
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

    
    /**
     * Set world in Objects
     * 
     * @param {object} obj - set world in the objects
     */
    setWorld(obj) {
        obj.world = this;
    }
    

    /**
     * Interval for some checks
     */
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


    /**
     * Check collision between bottle and endboss
     */
    checkCollisionThrowableObjekt() {
        this.level.endBoss.forEach((endBoss) =>{
            this.thrownBottle.forEach((thrownBottle) => {
                this.isCollidingBottleEndboss(thrownBottle, endBoss);
            })                
        });  
    }


    /**
     * Is Colliding, than play sound, damage endboss
     * 
     * @param {object} thrownBottle - thrown bottle met endboss
     * @param {object} endBoss - endboss 
     */
    isCollidingBottleEndboss(thrownBottle , endBoss){
        if (!thrownBottle.isBrokenBottle && thrownBottle.isColliding(endBoss)) {
            thrownBottle.playSound(thrownBottle.break_sound, '');
            if (!(endBoss.immune)) {
                endBoss.playSound(endBoss.chicken_hurt_sound, '');
                endBoss.chicken_hurt_sound.volume = 0.6;
            }
            endBoss.hit();
            this.endBossStatusBar.setPercentage(endBoss.energy);
            thrownBottle.isBrokenBottle = true;
            thrownBottle.attackEndboss = true;                  
        }
    }

    
    /**
     * Check collision between bottle and enemy
     */
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


    /**
     * Check throw bottle outsite the gameplace and from the Array and splice there, when a bottle was thrown
     */
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
        this.spliceBottleFromArray();
    }


    spliceBottleFromArray(){
        for (let i = this.thrownBottle.length - 1; i >= 0; i--) {
            if (this.thrownBottle[i].y > 550) {
                this.thrownBottle.splice(i, 1);
            }
        }  
    }
    

    /**
     * Check if the character can jump on an enemy, and if so, trigger the jump.
     */
    checkJumpOnChicken() {
        if (!this.level.enemies.isJumped && this.character.y < 200 && this.character.speedY < 0) {
            let selectedChicken = this.findEnemyWithMaxOverlap(this.level.enemies, this.character);
            if (selectedChicken !== null) {
                selectedChicken.isJumped = true;
                this.enemyDeadAnimation(selectedChicken);
            }
        }
    }
    

    /**
     * Find the enemy with the maximum overlap with the character's jump.
     * 
     * @param {Array} enemies - Array of enemies to check.
     * @param {Object} character - The character object.
     * @returns {Object|null} - The enemy object with the maximum overlap, or null if no enemy found.
     */
    findEnemyWithMaxOverlap(enemies, character) {
        let maxHorizontalOverlap = 0;
        let selectedEnemy = null;
    
        enemies.forEach((enemy) => {
            let horizontalOverlap = character.isJumpOnEnemie(enemy);
            if (horizontalOverlap > maxHorizontalOverlap) {
                maxHorizontalOverlap = horizontalOverlap;
                selectedEnemy = enemy;
            }
        });
        return selectedEnemy;
    }
    


    /**
     * Deadanimation with Audiosound from enemies
     * 
     * @param {object} enemy - the enemy, where the character jump on it
     */
    enemyDeadAnimation(enemy) {
        if (!enemy.enemyIsDead) {
            enemy.playSound(enemy.chicken_sound, '');
            enemy.stopAnimations();
            this.isCharacterJumpOnEnemy(enemy);
            enemy.enemyIsDead = true;
            this.IMAGES_DEAD = enemy.IMAGES_DEAD;
            enemy.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                enemy.playSound(enemy.chicken_sound, 'paused');
            }, 600);
            this.spliceEnemyfromArry(enemy);
        }
    }


    /**
     * Is character jump on enemy
     * 
     * @param {object} enemy - if character jump on enemy
     */
    isCharacterJumpOnEnemy(enemy){
        if (enemy.isJumped === true) {
            this.character.jump();
            this.character.playSound(this.character.jump_sound, '');
        }
    }


    /**
     * Enemy splice from Array
     * 
     * @param {object} enemy - if the enemy is dead, then will be splice from Array
     */
    spliceEnemyfromArry(enemy){
        setTimeout(() => {
            if (enemy.enemyIsDead) {
                let index = this.level.enemies.indexOf(enemy);
                if (index !== -1) {
                    this.level.enemies.splice(index, 1);
                }
            }
        }, 350);
    }


    /**
     * Check Colliding between character and endboss or character and enemy
     * 
     * @param {ArrayWithStrings} enemies - Array with everyone enemies
     */
    checkCollisions(enemies){
        enemies.forEach((e) =>{
            this.level[e].forEach((enemy) => {
                if (!enemy.isJumped || !this.level.endBoss.endBossIsDead){
                    this.isCharacterCollidingWithEnemy(enemy);
                }
            })
        })             
    }


    /**
     * Is character colliding enemy
     * 
     * @param {object} enemy - enemy, who collidet with character
     */
    isCharacterCollidingWithEnemy(enemy){
        if (this.character.isColliding(enemy) && !enemy.enemyIsDead ) {
            this.ifCharacterCollidingEndboss(enemy);
            if (!this.character.immune) {
                this.character.playSound(this.character.hurt_sound, '');
            }
            this.level.endBoss[0].playSound(this.level.endBoss[0].chicken_walking, 'paused');
            this.level.endBoss[0].chicken_walking.currentTime = 0;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }


    /**
     * Character is colliding endboss
     * 
     * @param {object} enemy - enemy is endboss - this is for the function from character isHurtBounce()
     */
    ifCharacterCollidingEndboss(enemy){
        if (!(enemy instanceof Endboss)) {
            this.character.isHurtCharacter = true;
        } else {
            this.character.isHurtCharacter = false;
        }
    }


    /**
     * Check collected Coins and Bottles
     */
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


    /**
     * Splice item from placedArray
     * 
     * @param {object} item - item, who are coins or bottles will be splice from placedArray
     */
    deletePlacedItems(item){
        let index = this.level.placedItems.indexOf(item);
        if (index !== -1) {
            this.level.placedItems.splice(index, 1);
        }
    }


    /**
     * Create new enemy, when the character come to X-breakpoints
     */
    createNewChickenIfNecessary() {
        if (this.character.x > this.breakpoint) {
            this.breakpoint += this.offset;
            let isChicken = Math.random() > 0.33;
            let newChicken = isChicken ? new Chicken(this.breakpoint) : new SmallChicken(this.breakpoint);
            this.setWorld(newChicken);
            this.level.enemies.push(newChicken);
        }
    }


    /**
     * Draw the game
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawMovableObjects();
        this.drawFixedObjects();
    
        this.createNewChickenIfNecessary();

        let self = this;
        this.requestAnimationFrame = requestAnimationFrame(() => {
            self.draw()
        });
    }


    /**
     * Draw movable Objects
     */
    drawMovableObjects(){
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.placedItems);
        this.addObjectsToMap(this.thrownBottle);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draw fixed Objects
     */
    drawFixedObjects(){
        this.addToMap(this.statusBar);
        this.addToMap(this.endBossStatusBar);
        this.addToMap(this.collectedCoinBar);
        this.addToMap(this.collectedBottleBar);
    }


    /**
     * Adds multiple objects to the game map.
     * 
     * @param {Array} objects - An array containing the objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }


    /**
     * Adds a single object to the game map.
     * 
     * @param {MapObject} mo - The object to be added to the map.
     */
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


    /**
     * Flips the image horizontally for the given map object.
     * 
     * @param {MapObject} mo The map object whose image needs to be flipped.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Reverts the horizontal flip of the image for the given map object.
     * 
     * @param {MapObject} mo The map object whose image's horizontal flip needs to be reverted.
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Push intervals to a Array - allInterval = []
     * 
     * @param {variable} id - id from the intervals; push with: this.pushIntervalToArray(this.lastInt);
     */
    pushIntervalToArray(id){
        setStoppableInterval(id);
    }
    

    /**
     * Forward to Endscreen
     */
    endScreen(){
        if (this.level.endBoss[0].gameOver === true) {            
            handleGameEnd('youWin');
        } else if (this.character.gameOver === true) {
            handleGameEnd('youLose');
        } 
    }

}
