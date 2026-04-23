/**
 * Represents the health status bar for the player character.
 * Extends the DrawableObject to handle the visual representation of the player's energy levels on the UI.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    /**
     * @type {string[]}
     * Array of image paths representing different fill levels of the health bar (from 0% to 100%).
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /** @type {number} - The current health percentage of the character (0 to 100). */
    percentage = 100;

    /**
     * Creates an instance of StatusBar.
     * Sets the initial position, dimensions, and loads the health bar images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = -5; 
        this.width = 170;
        this.height = 40;
        this.setPercentage(100); 
    }

    /**
     * Updates the percentage value of the bar and sets the corresponding image from the cache.
     * @param {number} percentage - The health percentage to be displayed.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];        
        this.img = this.imageCache[path];
    }

    /**
     * Logic to determine the correct image index based on the current percentage.
     * @returns {number} The index (0-5) of the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}