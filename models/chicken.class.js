/**
 * Represents a standard chicken enemy in the game.
 * The chicken moves automatically to the left and plays a walking animation until it dies.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /** @type {number} - The vertical position of the chicken on the ground. */
    y = 360;
    
    /** @type {number} - The height of the chicken object. */
    height = 70;
    
    /** @type {number} - The width of the chicken object. */
    width = 60;

    /**
     * Creates an instance of a Chicken.
     * Initializes images, randomizes the starting horizontal position and speed, and starts animations.
     */
    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /** * @type {string[]} 
     * Array of image paths for the chicken's walking animation.
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** * @type {string[]} 
     * Array of image paths for the chicken's dead state.
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Sets up the behavior intervals for the chicken.
     * One interval handles horizontal movement, while the other handles animation frame changes.
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
                this.loadImage(this.IMAGES_DEAD[0]); 
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}