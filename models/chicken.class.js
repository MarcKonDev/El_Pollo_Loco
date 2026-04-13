class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 60;
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    // animate() {
    //     setInterval(() => {
    //         this.moveLeft();
    //     }, 1000 / 60);

    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_WALKING);
    //     }, 200);
    //     this.moveLeft();
    // }


    animate() {
        setInterval(() => {
            if (!this.isDead()) { // Nur bewegen, wenn nicht tot
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0]); // Zeige totes Bild
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }



}