class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2550;

    constructor(enemies, clouds, backgroundObjects, coin, bottle){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coin;
        this.bottles = bottle;
    }
}