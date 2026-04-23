/**
 * Represents the health bar for the Endboss.
 * Extends DrawableObject to handle the visual representation and dynamic sizing of the boss health UI.
 * @extends DrawableObject
 */
class EndbossBar extends DrawableObject {

    /** @type {number} - The current width of the bar, used for the opening animation. */
    width = 0;
    /** @type {number} - The current height of the bar, used for the opening animation. */
    height = 0;
    /** @type {number} - The final width the bar should reach. */
    maxWidth = 170;
    /** @type {number} - The final height the bar should reach. */
    maxHeight = 40;
    /** @type {number} - The target horizontal coordinate for the bar. */
    targetX = 530;
    /** @type {number} - The target vertical coordinate for the bar. */
    targetY = 25;

    /** @type {string[]} - Array of image paths representing health levels from 0% to 100%. */
    IMAGES_BAR = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];


    /**
     * Creates an instance of EndbossBar.
     * Preloads health bar images and initializes health to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR);
        this.setPercentage(100);
    }

    /**
     * Updates the current health percentage and sets the corresponding image.
     * @param {number} percentage - The health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the current health percentage to the appropriate image index.
     * @returns {number} The index of the image in the IMAGES_BAR array (0 to 5).
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

    /**
     * Animates the health bar size when the boss appears.
     * Increases dimensions until maxWidth/maxHeight are reached and centers the bar.
     */
    updateSize() {
        if (this.width < this.maxWidth) {
            this.width += 5; 
            this.height += 1.2;
            this.x = this.targetX + (this.maxWidth / 2) - (this.width / 2);
            this.y = this.targetY + (this.maxHeight / 2) - (this.height / 2);
        }
    }
}