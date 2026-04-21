class SmallChicken extends MovableObject {
    y = 380;
    width = 50;
    height = 60;
    offset = {
        top: 5, 
        bottom: 5,  
        left: 5,    
        right: 5    
    };

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    animate() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD[0])
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}