/**
 * Represents the main game engine and world state.
 * Handles the game loop, collision detection, object management, and rendering.
 */
class World {
    /** @type {Character} - The main playable character. */
    character = new Character();
    /** @type {StatusBar} - The character's health bar. */
    statusBar = new StatusBar();
    /** @type {CoinBar} - The bar displaying collected coins. */
    coinBar = new CoinBar();
    /** @type {BottleBar} - The bar displaying available salsa bottles. */
    bottleBar = new BottleBar();
    /** @type {EndbossBar} - The health bar for the Endboss. */
    endbossBar = new EndbossBar();
    /** @type {Audios} - Manager for sound effects and music. */
    audio = new Audios();
    /** @type {Endboss|null} - Reference to the level's final boss. */
    endboss = null;
    /** @type {Level} - The current level instance containing objects. */
    level = level1;
    /** @type {HTMLCanvasElement} - The HTML canvas element. */
    canvas;
    /** @type {CanvasRenderingContext2D} - The 2D context for drawing. */
    ctx;
    /** @type {Keyboard} - The keyboard input manager. */
    keyboard;
    /** @type {number} - Horizontal camera offset for scrolling. */
    camera_x = 0;
    /** @type {ThrowableObject[]} - Array of currently active throwable bottles. */
    throwableObjects = [];
    /** @type {boolean} - Flag to indicate if the game has ended. */
    gameStopped = false;

    /**
     * Initializes the world and starts the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
     * @param {Keyboard} keyboard - The instance managing player input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playMusic()
    }

    /**
     * Links the world instance to entities and finds the Endboss.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.endboss = this.level.enemies.find(e => e instanceof Endboss);
    }

    /**
     * Sets up and plays the background music based on mute settings.
     */
    playMusic() {
        this.audio.setupBackgroundMusic('background');
        if (isGameMuted) {
            this.audio.muteAll(true);
        } else {
            this.audio.SOUNDS.background.play();
        }
    }

    /**
     * Starts game intervals for game logic, physics, and collision checks.
     */
    run() {
        setInterval(() => {
            if (this.gamePaused) return;
            this.checkBottleCollision();
            this.checkGameOver();
        }, 200);
        setInterval(() => {
            if (this.gamePaused) return;
            this.checkObjectsToCollect();
            this.checkCollisions();
            this.checkThrow();
        }, 1000 / 60);
    }

    /**
     * Checks if the win or lose conditions are met.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            this.handleGameOver('img/You won, you lost/Game Over.png');
        } else if (this.level.enemies.find(e => e instanceof Endboss)?.isDead()) {
            this.handleGameOver('img/You won, you lost/You Win A.png');
        }
    }

    /**
     * Triggers the end of the game and UI changes.
     * @param {string} imagePath - Path to the endscreen image (Win or Loss).
     */
    handleGameOver(imagePath) {
        this.showEndscreen(imagePath);
        document.getElementById('pause_btn').classList.add('d_none');
        document.getElementById('control_btns').classList.add('d_none');
        document.getElementById('impressum_btn').classList.remove('d_none');
    }

    /**
     * Displays the endscreen and stops game intervals.
     * @param {string} imagePath - Path to the endscreen image.
     */
    showEndscreen(imagePath) {
        if (!this.gameStopped) {
            this.gameStopped = true;
            document.getElementById('control_btns').classList.remove('active-controls');
            document.getElementById('control_btns').classList.add('d_none');
            setTimeout(() => {
                let screen = document.getElementById('endscreen');
                screen.src = imagePath;
                document.getElementById('endscreen_container').classList.remove('d_none');
                this.stopAllIntervals();
            }, 500);
        }
    }

    /**
     * Clears all active intervals to freeze the game logic.
     */
    stopAllIntervals() {
        this.gameStopped = true;
        setTimeout(() => {
            for (let i = 1; i < 9999; i++) {
                window.clearInterval(i);
            }
        }, 500);
    }

    /**
     * Checks if any thrown bottles collide with enemies.
     */
    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isBroken) return;
            this.level.enemies.forEach((enemy, enemyIndex) => {
                this.checkEnemyHitByBottle(bottle, enemy, enemyIndex);
            });
        });
    }

    /**
     * Handles specific interaction when a bottle hits an enemy.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {MovableObject} enemy - The enemy targeted.
     * @param {number} enemyIndex - The index of the enemy in the level array.
     */
    checkEnemyHitByBottle(bottle, enemy, enemyIndex) {
        if (bottle.isColliding(enemy)) {
            this.applyBottleDamage(enemy, enemyIndex);
            bottle.break();
            setTimeout(() => {
                let currentIndex = this.throwableObjects.indexOf(bottle);
                if (currentIndex !== -1) this.throwableObjects.splice(currentIndex, 1);
            }, 200);
        }
    }

    /**
     * Damages or removes an enemy based on the type.
     * @param {MovableObject} enemy - The enemy to damage.
     * @param {number} enemyIndex - Index for splicing regular enemies.
     */
    applyBottleDamage(enemy, enemyIndex) {
        if (enemy instanceof Endboss) {
            enemy.hit();
            this.audio.play('bottle_smash');
            this.audio.play('hurt_endboss');
            this.endbossBar.setPercentage(enemy.energy);
        } else {
            this.level.enemies.splice(enemyIndex, 1);
            this.audio.play('bottle_smash');
            this.audio.play('chicken_kill');
        }
    }

    /**
     * Checks if the throw key is pressed and triggers object creation.
     */
    checkThrow() {
        if (this.keyboard.D && !this.character.isThrowing) {
            if (this.character.collectedBottles > 0) {
                this.checkThrowObjects();
                this.character.isThrowing = true; // Setze Sperre im Charakter
            }
        }
        if (!this.keyboard.D) {
            this.character.isThrowing = false;
        }
    }

    /**
     * Checks for collisions between the character and collectible items.
     */
    checkObjectsToCollect() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collect(coin);
                this.audio.play('coin');
                this.coinBar.setPercentage(this.character.collectedCoins);
                this.level.coins.splice(index, 1);
            }
        });
        this.checkBottlesToCollect();
    }

    /**
     * Specifically checks for bottle pickups.
     */
    checkBottlesToCollect() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collect(bottle);
                this.audio.play('bottle_collect');
                this.bottleBar.setPercentage(this.character.collectedBottles);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
     * Logic for creating a new throwable bottle and updating inventory.
     */
    checkThrowObjects() {
        if (this.character.collectedBottles > 0) {
            this.character.resetIdleTimer();
            let direction = this.character.otherDirection ? 'left' : 'right';
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 100, direction);
            this.throwableObjects.push(bottle);
            this.audio.play('throw');
            this.character.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
        }
    }

    /**
     * Checks collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.processEnemyCollision(enemy);
            }
        });
    }

    /**
     * Determines whether character jumps on an enemy or gets hurt.
     * @param {MovableObject} enemy - The enemy the character is colliding with.
     */
    processEnemyCollision(enemy) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            this.handleEnemyJumpKill(enemy);
        } else if (!this.character.isHurt() && !this.character.invincibleAfterJump) {
            this.character.hit();
            this.audio.play('hurt_character');
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Entry point for killing or damaging enemies by jumping on them.
     * @param {MovableObject} enemy
     */
    handleEnemyJumpKill(enemy) {
        if (enemy instanceof Endboss) {
            this.handleEndbossJumpHit(enemy);
        } else {
            this.handleRegularEnemyJumpKill(enemy);
        }
    }

    /**
     * Logic for damaging the Endboss via a jump.
     * @param {Endboss} enemy
     */
    handleEndbossJumpHit(enemy) {
        this.audio.play('jump_kill');
        this.audio.play('hurt_endboss');
        enemy.hit();
        this.endbossBar.setPercentage(enemy.energy);
    }

    /**
     * Logic for killing standard enemies via a jump.
     * @param {MovableObject} enemy
     */
    handleRegularEnemyJumpKill(enemy) {
        enemy.energy = 0;
        this.character.speedY = 15;
        this.character.currentJumpImage = 0;
        this.character.invincibleAfterJump = true;
        setTimeout(() => {
            this.character.invincibleAfterJump = false;
        }, 200);
        this.audio.play('jump_kill');
        this.audio.play('chicken_kill');
        enemy.loadImage(enemy.IMAGES_DEAD[0]);
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index !== -1) this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Primary render function. Clears canvas and initiates drawing of dynamic and static objects.
     */
    draw() {
        if (this.gamePaused) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.drawDynamicObjects();
        this.ctx.restore();
        this.drawStaticObjects();
        if (!this.gamePaused) {
            requestAnimationFrame(() => this.draw());
        }
    }

    /**
     * Draws objects that move relative to the camera.
     */
    drawDynamicObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
    }

    /**
     * Draws UI elements that remain fixed on the screen.
     */
    drawStaticObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.endboss && this.endboss.BossBarAnimation) {
            this.endbossBar.updateSize();
            this.addToMap(this.endbossBar);
        }
    }

    /**
     * Uses requestAnimationFrame to create a smooth rendering loop.
     */
    requestNextFrame() {
        if (!this.gamePaused) {
            requestAnimationFrame(() => this.draw());
        }
    }

    /**
     * Iterates through an array of objects to add them to the map.
     * @param {DrawableObject[]} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Logic for drawing a single object, handles image flipping for direction.
     * @param {MovableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Flips the context horizontally to draw objects facing left.
     * @param {MovableObject} mo
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the context and X-coordinate after drawing a flipped image.
     * @param {MovableObject} mo
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    gameOverUI() {
        document.getElementById('control_btns').classList.remove('active-controls');
    }
}