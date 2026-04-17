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
    gameStopped = false;

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
            this.checkObjectsToCollect();
            this.checkBottleCollision();
            this.checkGameOver();
        }, 200);

        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60);
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.showEndscreen('img/You won, you lost/Game Over.png');
        } else if (this.level.enemies.find(e => e instanceof Endboss)?.isDead()) {
            this.showEndscreen('img/You won, you lost/You Win A.png');
        }
    }

    showEndscreen(imagePath) {
        if (!this.gameStopped) {
            this.gameStopped = true;
            setTimeout(() => {
                let screen = document.getElementById('endscreen');
                screen.src = imagePath;
                document.getElementById('endscreen_container').classList.remove('d_none');
                this.stopAllIntervals();
            }, 500);
        }
    }

    stopAllIntervals() {
        setTimeout(() => {
            for (let i = 1; i < 9999; i++) {
                window.clearInterval(i);
            }
        }, 500);
    }

    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
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

    checkObjectsToCollect() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collect(coin);
                this.coinBar.setPercentage(this.character.collectedCoins)
                this.level.coins.splice(index, 1)
            }
        });
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect(bottle);
                this.bottleBar.setPercentage(this.character.collectedBottles)
                this.level.bottles.splice(index, 1)
            }
        });
    }

    checkThrowObjects() {
        if (this.character.collectedBottles > 0) {
            this.character.resetIdleTimer();
            let direction = this.character.otherDirection ? 'left' : 'right';
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 100, direction);

            this.throwableObjects.push(bottle);
            this.character.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
        }

    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.handleEnemyJumpKill(enemy);
                }
                else if (!this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    handleEnemyJumpKill(enemy) {
        if (enemy instanceof Endboss) {
            enemy.hit();
        } else {
            enemy.energy = 0;
            this.character.speedY = 15;
            // this.character.lastHit = new Date().getTime();
            enemy.loadImage(enemy.IMAGES_DEAD[0]);
            setTimeout(() => {
                let index = this.level.enemies.indexOf(enemy);
                if (index !== -1) {
                    this.level.enemies.splice(index, 1);
                }
            }, 500);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save()
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.ctx.restore();
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