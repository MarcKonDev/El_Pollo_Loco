class Coins extends MovableObject {

    y = 340
    width = 100;
    height = 100;
    offset = {
        top: 35,    
        bottom: 35,  
        left: 35,    
        right: 35    
    };

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(){
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }
    
     animate() {
        setInterval(() => {
             this.playAnimation(this.IMAGES_COINS);
        }, 300);
    }
}