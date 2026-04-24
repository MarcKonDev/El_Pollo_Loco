/**
 * @type {Level}
 * Global variable that holds the primary level instance.
 */
let level1;

/**
 * Initializes the first level of the game by instantiating the Level class 
 * with various game entities including enemies, clouds, background objects, coins, and bottles.
 */
function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()
        ],
        [
            new Cloud(),
            new Cloud(),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -720, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720, 0),

            new BackgroundObject('img/5_background/layers/air.png', 0, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 0),
            new BackgroundObject('img/5_background/layers/air.png', 720, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720, 0),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 2, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2, 0),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 3, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3, 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3, 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3, 0),

        ],
        [
            new Coins(400, 300),
            new Coins(850, 200),
            new Coins(900, 180),
            new Coins(950, 160),
            new Coins(1000, 160),
            new Coins(1050, 180),
            new Coins(2250, 200),
            new Coins(2300, 200),
            new Coins(2350, 200),
            new Coins(2400, 200)
        ],
        [
            new Bottle(500, 360),
            new Bottle(560, 360),
            new Bottle(600, 360),
            new Bottle(900, 360),
            new Bottle(1000, 360),
            new Bottle(1400, 360),
            new Bottle(1600, 360),
            new Bottle(2100, 360),
            new Bottle(2500, 360)
        ],
    );
}