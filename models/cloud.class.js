/**
 * Represents a cloud object in the background of the game world.
 * Clouds move slowly across the screen to create a sense of depth and atmosphere.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} - The vertical position of the cloud. */
    y = 1;

    /** @type {number} - The height of the cloud object. */
    height = 300;

    /** @type {number} - The width of the cloud object. */
    width = 500;

    /**
     * Creates an instance of a Cloud.
     * Loads the cloud image and randomizes the starting horizontal position.
     */
    constructor(){
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = -400 + Math.random() * 1000;
        this.animate();
    }

    /**
     * Initiates the movement behavior of the cloud.
     * Calls the inherited moveLeft method to start the horizontal progression.
     */
    animate(){
        this.moveLeft();
    }
}