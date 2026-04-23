/**
 * Represents the status bar for collected bottles.
 * Extends the DrawableObject to handle rendering of the bar on the UI.
 * @extends DrawableObject
 */
class BottleBar extends DrawableObject {

    /**
     * @type {string[]}
     * Array of image paths representing different fill levels of the bottle bar.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /** @type {number} - The current percentage fill of the bar (0 to 100). */
    percentage = 0;

    /**
     * Creates an instance of BottleBar.
     * Sets initial coordinates, dimensions, and loads the required images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 30; 
        this.width = 170;
        this.height = 40;
        this.setPercentage(0); 
    }

    /**
     * Updates the percentage fill of the bar and changes the displayed image accordingly.
     * @param {number} percentage - The new percentage value for the bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the current percentage to the corresponding image index.
     * @returns {number} The index of the image in the IMAGES array (0 to 5).
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}