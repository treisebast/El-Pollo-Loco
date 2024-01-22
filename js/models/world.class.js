class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

    breakpoint = 350;
    offset= 350;
    keyboardSpaceEnter = false;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run(){
        setInterval(() =>{
            this.checkCollisions(['endBoss', 'enemies']);
            this.checkThrowObjects();
        }, 150)

        setInterval(() =>{
            this.checkJumpOnChicken();
        }, 20)
    }


    checkThrowObjects(){
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);        
        }
    }

    checkJumpOnChicken(){
        if (this.keyboard.SPACE) {
            this.keyboardSpaceEnter = true;
            this.level.enemies.forEach((enemy) => {
                if (this.character.isJumpOnEnemie(enemy) && this.keyboardSpaceEnter === true) {
                    this.character.jump();
                    setTimeout(() => {
                        new MovableObject().playAnimation(new SmallChicken().IMAGES_DEAD);
                      }, 1000);
                    this.enemyDead(enemy);
                    this.keyboardSpaceEnter = false;
                }    
            })
        }  
    }

    
    enemyDead(e){
        this.level.enemies.splice(e, 1);
        console.log(this.level.enemies);
    }


    checkCollisions(enemies){
        enemies.forEach((e) =>{
            this.level[e].forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            })
        }) 
    }


    createNewChickenIfNecessary() {
        if (this.character.x > this.breakpoint) {
            this.breakpoint += this.offset;
            let isChicken = Math.random() > 0.33;
            let newChicken = isChicken ? new Chicken(this.breakpoint) : new SmallChicken(this.breakpoint);
            this.level.enemies.push(newChicken);
        }
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.ctx.translate(-this.camera_x, 0);
        //------------ Space for fixed objects
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.createNewChickenIfNecessary();
        setTimeout(() => {
            requestAnimationFrame(() => this.draw());
        }, 20);

        //Draw() wird immer wieder aufgerufen
        // let self = this;
        // requestAnimationFrame(function(){
        //     self.draw();
        // });
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
    
}
