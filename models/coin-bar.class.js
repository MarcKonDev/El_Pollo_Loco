/**
 * Represents the status bar for collected coins.
 * Extends the DrawableObject to handle the visual representation of coin progress on the UI.
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    /**
     * @type {string[]}
     * Array of image paths representing different fill levels of the coin bar.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /** @type {number} - The current value/percentage of collected coins. */
    percentage = 0;

    /**
     * Creates an instance of CoinBar.
     * Initializes the position, dimensions, and loads the required images for the coin status.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20; 
        this.y = 65; 
        this.width = 170;
        this.height = 40;
        this.setPercentage(0); 
    }

    /**
     * Updates the coin progress and switches the displayed image based on the current value.
     * @param {number} percentage - The new coin value to display.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the correct image index from the IMAGES array based on the current percentage.
     * Note: Uses thresholds to determine which of the 6 stages (0-5) to display.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage >= 200) {
            return 5;
        } else if (this.percentage >= 160) {
            return 4;
        } else if (this.percentage >= 120) {
            return 3;
        } else if (this.percentage >= 80) {
            return 2;
        } else if (this.percentage >= 40) {
            return 1;
        } else {
            return 0;
        }
    }
    
}