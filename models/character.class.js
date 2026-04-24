/**
 * Represents the main playable character in the game.
 * Handles user input, movement logic, animations, and state management.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {number} */
    x = 100;
    /** @type {number} */
    y = 174;
    /** @type {number} */
    height = 260;
    /** @type {number} */
    width = 120;
    /** @type {number} */
    speed = 10;
    /** @type {number} */
    lastMovementTime = 5;
    /** @type {World} - Reference to the game world to access keyboard and level data. */
    world;
    /** * @type {Object} - Collision offsets to fine-tune hitboxes.
     * @property {number} top, bottom, left, right 
     */

    invincibleAfterJump = false;
    
    offset = {
        top: 110,
        bottom: 10,
        left: 30,
        right: 35
    };

    /** @type {string[]} - Images for the standard idle animation. */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /** @type {string[]} - Images for the long idle (sleeping) animation. */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /** @type {string[]} - Images for the walking animation. */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} - Images for the jumping animation. */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /** @type {string[]} - Images for the death animation. */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /** @type {string[]} - Images for the hurt animation. */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /** @type {string[]} - Images for the attack animation. */
    IMAGES_ATTACK = [
        'img/bombe.png'
    ];

    /**
     * Initializes the character, loads all image sets, and starts physics/animations.
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.applyGravity();
        this.animate();
        this.lastMovementTime = new Date().getTime();
    }

    /**
     * Sets up the intervals for movement, animation states, and sound effects.
     */
    animate() {
        setInterval(() => this.handleMovement(), 1000 / 60);
        setInterval(() => this.handleAnimations(), 100);
        setInterval(() => this.handleWalkingSound(), 1000 / 60);
    }

    /**
     * Handles character positioning based on keyboard input and updates the camera.
     */
    handleMovement() {
        if (this.world.gamePaused) return;
        let isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE;
        if (isMoving) this.resetIdleTimer();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.world.audio.play('jump');
        }
        this.world.camera_x = Math.max(-this.x + 160, -2150);
    }

    /**
     * Controls which animation set is played based on the character's current state.
     */
    handleAnimations() {
        if (this.world.gamePaused) return;
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.keepLastFrame(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.resetIdleTimer();
        } else if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else {
            this.currentJumpImage = 0;
            this.handleGroundAnimations();
        }
    }

    /**
 * Plays the jumping animation exactly once per jump.
 */
    playJumpAnimation() {
        let i = this.currentJumpImage;
        let path = this.IMAGES_JUMPING[i];
        this.img = this.imageCache[path];

        // Erhöhe den Frame-Zähler nur, wenn wir noch nicht am Ende der Animation sind
        if (this.currentJumpImage < this.IMAGES_JUMPING.length - 1) {
            this.currentJumpImage++;
        }
    }

    /**
     * Switches between walking and idle animations when the character is on the ground.
     */
    handleGroundAnimations() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.handleIdleAnimations();
        }
    }

    /**
     * Ensures an animation stays on its final frame instead of looping (used for death).
     * @param {string[]} images - The array of image paths for the animation.
     */
    keepLastFrame(images) {
        if (this.currentImage >= images.length) {
            this.currentImage = images.length - 1;
        }
    }

    /**
     * Manages the walking sound effect based on movement state.
     */
    handleWalkingSound() {
        if (this.world.gamePaused) return;
        let isWalking = (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround();
        if (isWalking) {
            this.world.audio.playLoop('walk');
        } else {
            this.world.audio.stop('walk');
        }
    }

    /**
     * Resets the timer used to trigger long idle animations.
     */
    resetIdleTimer() {
        this.lastMovementTime = new Date().getTime();
    }

    /**
     * Plays standard idle or sleeping animation depending on time passed since last movement.
     */
    handleIdleAnimations() {
        let timePassed = (new Date().getTime() - this.lastMovementTime) / 1000;
        if (timePassed > 5) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}