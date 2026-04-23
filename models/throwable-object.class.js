/**
 * Represents an object that can be thrown by the character (e.g., a salsa bottle).
 * Handles physics for throwing, rotation animations, and collision-based "breaking" effects.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /** @type {string[]} - Array of image paths for the bottle's spinning animation while in the air. */
    IMAGES_SPIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /** @type {string[]} - Array of image paths for the splash animation when the bottle hits an object. */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The starting horizontal position.
     * @param {number} y - The starting vertical position.
     * @param {string} direction - The direction of the throw ('left' or 'right').
     */
    constructor(x, y, direction) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPIN);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
        this.animate();
    }

    /**
     * Handles the animation states for the object.
     * Switches between spinning and splashing animations based on the `isBroken` state.
     */
    animate() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (this.isBroken) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_SPIN);
            }
        }, 50);
    }

    /**
     * Initiates the throwing physics.
     * Applies an initial vertical speed, gravity, and horizontal movement in the specified direction.
     * @param {string} direction - The horizontal direction ('left' or 'right').
     */
    throw(direction) {
        this.speedY = 30;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (this.isBroken) {
                clearInterval(throwInterval); 
            } else {
                if (direction === 'left') {
                    this.x -= 10;
                } else { 
                    this.x += 10;
                }
            }
        }, 25);
    }

    /**
     * Marks the object as broken.
     * Stops horizontal/vertical movement to allow the splash animation to play in place.
     */
    break() {
        this.isBroken = true;
        this.speedY = 0; 
    }
}