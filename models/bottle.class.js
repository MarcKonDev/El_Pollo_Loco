class Bottle extends MovableObject{
    y = 360;
    width = 70; 
    height = 70;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 400);
    }
}