/**
 * Represents a basic object that can be drawn on the canvas.
 * This serves as a base class for all visible game elements.
 */
class DrawableObject {
    /** @type {number} - Horizontal position on the canvas. */
    x = 120;
    
    /** @type {number} - Vertical position on the canvas. */
    y = 280;
    
    /** @type {number} - Height of the object in pixels. */
    height = 150;
    
    /** @type {number} - Width of the object in pixels. */
    width = 100;
    
    /** @type {HTMLImageElement} - The current image object to be drawn. */
    img;
    
    /** @type {Object<string, HTMLImageElement>} - A cache of preloaded image objects for animations. */
    imageCache = {};
    
    /** @type {number} - Index of the current image in an animation sequence. */
    currentImage = 0;

    /**
     * Loads a single image from a given path.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads multiple images into the image cache for faster access during animations.
     * @param {string[]} arr - An array of file paths to the images.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}