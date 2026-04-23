/**
 * Represents a collectible coin object in the game world.
 * Extends MovableObject to handle animations and collision detection through offsets.
 * @extends MovableObject
 */
class Coins extends MovableObject {

    /** @type {number} - The default vertical position for the coin. */
    y = 340;

    /** @type {number} - The width of the coin object. */
    width = 100;

    /** @type {number} - The height of the coin object. */
    height = 100;

    /** * @type {Object} - Internal collision boundaries relative to the object's size.
     * @property {number} top - Top offset.
     * @property {number} bottom - Bottom offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     */
    offset = {
        top: 35,    
        bottom: 35,  
        left: 35,    
        right: 35    
    };

    /** @type {string[]} - Array of image paths for the coin's spinning animation. */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of a Coin.
     * Initializes images, starts the animation, and sets the specific coordinates.
     * @param {number} x - The horizontal starting position.
     * @param {number} y - The vertical starting position.
     */
    constructor(x, y){
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.animate();
        this.x = x;
        this.y = y;
    }
    
    /**
     * Sets up the animation interval for the coin.
     * Rotates through the coin images if the game is not paused.
     */
     animate() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
             this.playAnimation(this.IMAGES_COINS);
        }, 300);
    }
}