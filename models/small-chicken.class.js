/**
 * Represents a smaller, faster version of the chicken enemy.
 * Extends MovableObject to handle automated movement and animations.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    /** @type {number} - The vertical position on the ground. */
    y = 380;
    
    /** @type {number} - The width of the small chicken. */
    width = 50;
    
    /** @type {number} - The height of the small chicken. */
    height = 60;

    /** * @type {Object} - Collision offsets to fine-tune the hitbox.
     * @property {number} top, bottom, left, right
     */
    offset = {
        top: 5, 
        bottom: 5,  
        left: 5,    
        right: 5    
    };

    /**
     * Creates an instance of SmallChicken.
     * Initializes images, sets a random starting position and speed, and starts animations.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /** @type {string[]} - Array of image paths for the walking animation. */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** @type {string[]} - Array containing the path for the dead state image. */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Sets up the behavioral intervals for the small chicken.
     * Handles horizontal movement (left) and the switching of animation frames.
     */
    animate() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0])
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}