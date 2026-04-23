/**
 * Represents a game level, containing all entities and environmental objects.
 * This class serves as a data structure to organize enemies, background elements, and collectibles.
 */
class Level {
    /** @type {Enemy[]} - Array containing all enemy objects in the level. */
    enemies;

    /** @type {Cloud[]} - Array containing cloud objects for the background. */
    clouds;

    /** @type {BackgroundObject[]} - Array containing background layers and static objects. */
    backgroundObjects;

    /** @type {Coin[]} - Array containing collectible coin objects. */
    coins;

    /** @type {Bottle[]} - Array containing collectible bottle objects. */
    bottles;

    /** @type {number} - The x-coordinate where the level officially ends. */
    level_end_x = 2550;

    /**
     * Creates a new Level instance.
     * @param {Enemy[]} enemies - List of enemies to spawn.
     * @param {Cloud[]} clouds - List of clouds for the sky.
     * @param {BackgroundObject[]} backgroundObjects - List of background layers.
     * @param {Coin[]} coin - List of coins placed in the level.
     * @param {Bottle[]} bottle - List of bottles placed in the level.
     */
    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coin;
        this.bottles = bottle;
    }
}