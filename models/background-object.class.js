/**
 * Represents a background layer or object in the game world.
 * Extends the MovableObject to inherit basic positioning and image loading capabilities.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    
    /** @type {number} - The default height of the background object in pixels. */
    height = 480;

    /** @type {number} - The default width of the background object in pixels. */
    width = 720;

    /**
     * Creates an instance of a BackgroundObject.
     * @param {string} imagePath - The file path to the image representing this background layer.
     * @param {number} x - The initial horizontal coordinate on the canvas.
     * @param {number} y - The vertical coordinate (note: this is overridden in the constructor to align with the bottom).
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}