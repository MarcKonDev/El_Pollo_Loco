class World {

    character = new Character();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrow();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkObjectsToCollect();
            this.checkBottleCollision();
        }, 200);
    }

    checkBottleCollision() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
        if (bottle.isBroken) return; 
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    enemy.hit();
                } else {
                    this.level.enemies.splice(enemyIndex, 1);
                }
                bottle.break(); 
                setTimeout(() => {
                    let currentIndex = this.throwableObjects.indexOf(bottle);
                    if (currentIndex !== -1) {
                        this.throwableObjects.splice(currentIndex, 1);
                    }
                }, 200);
            }
        });
    });
}

    checkThrow() {
        let throwLock = false;
        window.addEventListener('keydown', (e) => {
            if (e.code == 'KeyD' && !throwLock) {
                throwLock = true;
                this.checkThrowObjects();
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.code == 'KeyD') {
                throwLock = false;
            }
        });
    }

    checkObjectsToCollect() {                                                     // 2. Funktion                              Objekt umgeändert
        this.level.coins.forEach((coin, index) => {                                    // geht alle Coins durch
            if (this.character.isColliding(coin)) {                               // wenn character mit coin kollidiert
                this.character.collect(coin);                                       // nimmt münze auf
                this.coinBar.setPercentage(this.character.collectedCoins)         // passt bottleBar bild an
                this.level.coins.splice(index, 1)
            }
        });
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect(bottle);                                       // nimmt münze auf
                this.bottleBar.setPercentage(this.character.collectedBottles)         // passt bottleBar bild an
                this.level.bottles.splice(index, 1)
            }
        });
    }

    checkThrowObjects() {
        if (this.character.collectedBottles > 0) {
            let direction = this.character.otherDirection ? 'left' : 'right';

            // Wir erstellen die Flasche und geben die Richtung mit
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 100, direction);

            this.throwableObjects.push(bottle);
            this.character.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
        }

    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save()                                         // aktuellen Canvasstand merken.
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.ctx.restore();                                    // Canvas zurücksetzen
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

