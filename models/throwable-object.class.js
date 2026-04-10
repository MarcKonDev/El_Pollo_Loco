class ThrowableObject extends MovableObject {

    constructor(x, y, direction){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');    
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
    }

    throw(direction){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() =>{
            if (direction === 'left') {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

}