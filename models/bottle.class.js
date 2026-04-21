class Bottle extends MovableObject{
    y = 360;
    x = 0;
    width = 70; 
    height = 70;
    offset = {
        top: 12,   
        bottom: 10,  
        left: 20,    
        right: 12    
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y){
        super();
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 400 + Math.random() * 2000;
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate(){
        setInterval(() =>{
            if (this.world && this.world.gamePaused) return;
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 400);
    }
}