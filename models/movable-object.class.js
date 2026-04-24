/**
 * Represents objects that can move, jump, and interact with physics.
 * Extends DrawableObject to include gravity, collision detection, and health management.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} - Horizontal movement speed. */
    speed = 0.15;

    /** @type {boolean} - Indicates if the object is facing the opposite direction (left). */
    otherDirection = false;

    /** @type {number} - Vertical speed for jumping and falling. */
    speedY = 0;

    /** @type {number} - Downward force applied during gravity. */
    acceleration = 2.5;

    /** @type {number} - Current health/energy points of the object. */
    energy = 100;

    /** @type {number} - Timestamp of the last time the object was hit. */
    lastHit = 0;

    /** * @type {Object} - Defines the inner boundaries for collision detection.
     * @property {number} top, left, right, bottom
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /** @type {World} - Reference to the game world instance. */
    world;

    /** @type {number} - Current amount of collected coins. */
    collectedCoins = 0;

    /** @type {number} - Current amount of collected bottles. */
    collectedBottles = 0;

    /** @type {number} - Tracks the current frame of the jump animation. */
    currentJumpImage = 0;

    /**
     * Applies gravity physics to the object.
     * Continuously reduces vertical position if the object is in the air or moving upward.
     */
    applyGravity() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                // --- DIESER TEIL IST NEU ---
                // Sobald er den Boden berührt (oder darunter fällt):
                this.y = 174;    // Erzeuge eine saubere Landung auf dem exakten Wert
                this.speedY = 0; // Stoppe die Fallgeschwindigkeit komplett
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is currently above the ground level.
     * @returns {boolean} True if the object is in the air or is a ThrowableObject.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 174;
        }
    }

    /**
     * Cycles through an array of images to create an animation effect.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Increases the horizontal X coordinate by the object's speed.
     */
    moveRight() {
        this.x += this.speed;
    };

    /**
     * Decreases the horizontal X coordinate by the object's speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

   /**
     * Triggers an upward movement and resets jump animation frame.
     */
    jump() {
        this.speedY = 30;
        this.currentJumpImage = 0; 
    }

    /**
     * Determines if this object is colliding with another MovableObject.
     * Takes custom offsets into account for precise hit detection.
     * @param {MovableObject} mo - The other movable object to check collision against.
     * @returns {boolean} True if a collision is detected.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Increases the inventory count of coins or bottles upon collection.
     * @param {Object} object - The collectible object (Coins or Bottle).
     */
    collect(object) {
        if (object instanceof Coins && this.collectedCoins < 200) {
            this.collectedCoins += 20;
        }

        if (object instanceof Bottle && this.collectedBottles < 100) {
            this.collectedBottles += 20;
        }
    }

    /**
     * Reduces the object's energy and updates the last hit timestamp.
     * Ignores hits if the object is currently in a hurt (invincible) state.
     */
    hit() {
        if (this.isHurt()) {
            return;
        }
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was hit recently (within the last second).
     * Used for temporary invincibility and hurt animations.
     * @returns {boolean} True if the object was recently hit.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the energy has reached zero.
     * @returns {boolean} True if energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }
}