/**
 * Represents the final boss enemy in the game.
 * Handles complex AI behaviors including patrolling, attacking, returning to position, and health management.
 * @extends MovableObject
 */
class Endboss extends MovableObject {

    /** @type {number} */
    height = 400;
    /** @type {number} */
    width = 250;
    /** @type {number} */
    y = 55;
    /** @type {number} */
    speed = 15;
    /** @type {boolean} - Indicates if the boss is currently in its forward dash attack. */
    isAttacking = false;
    /** @type {boolean} - Indicates if the boss is moving back to its original position after an attack. */
    isReturning = false;
    /** @type {boolean} - Becomes true once the player triggers the encounter. */
    fightMode = false;
    /** @type {number} - The boss's health points. */
    energy = 100;
    /** @type {number} - Timestamp of the last hit taken for the hurt state. */
    lastHit = 0;
    /** @type {World} - Reference to the game world. */
    world;
    /** * @type {Object} - Collision boundary fine-tuning.
     * @property {number} top, bottom, left, right 
     */
    offset = {
        top: 70,
        bottom: 25,
        left: 30,
        right: 30
    };
    /** @type {boolean} - Controls the appearance animation of the boss health bar. */
    BossBarAnimation = false;


    /** @type {string[]} - Walking animation frames. */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {string[]} - Idle/Alert animation frames when spotting the player. */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /** @type {string[]} - Attack animation frames. */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /** @type {string[]} - Animation frames played when the boss is hit. */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {string[]} - Animation frames played when the boss dies. */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Initializes the Endboss, loads all relevant animations, 
     * sets the starting position and begins the AI logic.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2750;
        this.animate();
    }

    /**
     * Sets up intervals for the boss logic (state handling) 
     * and the attack cooldown/trigger system.
     */
    animate() {
        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            this.handleBossLogic();
        }, 200);

        setInterval(() => {
            if (this.world && this.world.gamePaused) return;
            if (this.fightMode && !this.isAttacking && !this.isReturning) {
                this.startAttack();
            }
        }, 1500);
    }

    /**
     * Central state machine for the boss AI. Determines which animation 
     * to play and which movement logic to execute based on health, distance, and flags.
     */
    handleBossLogic() {
        if (!this.world) return;
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.handleDeathSink();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.world.character.x > 1800 && !this.fightMode) {
            this.moveTowardsStartPostion();
            this.startBossBar();
        } else if (this.isAttacking) {
            this.performAttack();
        } else if (this.isReturning) {
            this.returnToPosition();
        } else if (this.fightMode) {
            this.playAnimation(this.IMAGES_ALERT);}
    }

    /**
     * Manages the "sinking" effect after the boss dies, 
     * making it move downwards off the screen after a short delay.
     */
    handleDeathSink() {
        if (!this.isDeadAlready) {
            this.isDeadAlready = true;
            setTimeout(() => {
                setInterval(() => {
                    this.y += 10;
                }, 50);
            }, 1000);
        }
    }

    /**
     * Moves the boss into its initial fighting range once triggered by the character's distance.
     */
    moveTowardsStartPostion() {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.x > 2600) {
            this.x -= this.speed;
        } else {
            this.fightMode = true;
        }
    }

    /**
     * Triggers the start of an attack sequence.
     */
    startAttack() {
        this.isAttacking = true;
    }

    /**
     * Executes the dash attack movement logic and plays the attack animation.
     */
    performAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.x -= 60;
        if (this.x <= 2200) {
            this.isAttacking = false;
            this.isReturning = true;
        }
    }

    /**
     * Moves the boss back to its home coordinate (2600) after an attack.
     */
    returnToPosition() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x += 30;
        if (this.x >= 2600) {
            this.isReturning = false;
        }
    }

    /**
     * Handles the logic for initializing the boss's health bar UI.
     */
    startBossBar() {
        if (!this.barIsActiv) {
            this.barIsActiv = true;
            setTimeout(() => {
                this.BossBarAnimation = true
            }, 500);
        }
    }
}