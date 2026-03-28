class Cloud extends MovableObject {
    y = 1;
    height = 300;
    width = 500;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = -400 + Math.random() * 1000;
    }
}