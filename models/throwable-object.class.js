class ThrowableObject extends MovableObject {

    IMAGES_SPIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPIN);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isBroken) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_SPIN);
            }
        }, 50);
    }

    throw(direction) {
        this.speedY = 30;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            if (this.isBroken) {
                clearInterval(throwInterval); // Stoppt die Vorwärtsbewegung
            } else {
                if (direction === 'left') {
                    this.x -= 10;
                } else {
                    this.x += 10;
                }
            }
        }, 25);
    }

    break() {
        this.isBroken = true;
        this.speedY = 0; // Stoppt das Fallen
    }

}