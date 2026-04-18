class EndbossBar extends DrawableObject {

    width = 0;
    height = 0;
    maxWidth = 170;
    maxHeight = 40;
    targetX = 530;
    targetY = 25;

    IMAGES_BAR = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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

    updateSize() {
        if (this.width < this.maxWidth) {
            this.width += 5; // Geschwindigkeit des Wachsens
            this.height += 1.2;

            // Trick für das Wachstum aus der Mitte:
            // Wir verschieben X nach links und Y nach oben, 
            // während die Bar breiter und höher wird.
            this.x = this.targetX + (this.maxWidth / 2) - (this.width / 2);
            this.y = this.targetY + (this.maxHeight / 2) - (this.height / 2);
        }
    }
}