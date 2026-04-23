/**
 * Represents a collectible bottle object in the game world.
 * Extends MovableObject to handle animations and collision detection.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /** @type {number} - The default vertical coordinate. */
    y = 360;

    /** @type {number} - The horizontal coordinate. */
    x = 0;

    /** @type {number} - The width of the bottle object. */
    width = 70; 

    /** @type {number} - The height of the bottle object. */
    height = 70;

    /** * @type {Object} - Internal collision boundaries relative to the object's size.
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 12,   
        bottom: 10,  
        left: 20,    
        right: 12    
    };

    /** @type {string[]} - Array of image paths for the bottle animation. */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates an instance of a Bottle.
     * @param {number} x - The horizontal starting position.
     * @param {number} y - The vertical starting position.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 400 + Math.random() * 2000;
        this.animate();
        this.x = x;
        this.y = y;
    }

    /**
     * Sets up the animation interval for the bottle.
     * Plays the rotation/ground animation if the game is not paused.
     */
    animate() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 400);
    }
}