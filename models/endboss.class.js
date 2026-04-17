class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;
    speed = 15;
    isAttacking = false;
    isReturning = false;
    fightMode = false;
    energy = 100;
    lastHit = 0;
    world;
    offset = {
        top: 70,   
        bottom: 25,  
        left: 30,    
        right: 30    
    };


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2800;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.handleBossLogic();
        }, 200);

        setInterval(() => {
            if (this.fightMode && !this.isAttacking && !this.isReturning) {
                this.startAttack();
            }
        }, 2000);
    }

    handleBossLogic() {
        if (!this.world) return;
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.handleDeathSink();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.world.character.x > 1800 && !this.fightMode) {
            this.moveTowardsStartPostion();
        } else if (this.isAttacking) {
            this.performAttack();
        } else if (this.isReturning) {
            this.returnToPosition();
        } else if (this.fightMode) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

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

    moveTowardsStartPostion() {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.x > 2600) {
            this.x -= this.speed;
        } else {
            this.fightMode = true;
        }
    }

    startAttack() {
        this.isAttacking = true;
    }

    performAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.x -= 40;
        if (this.x <= 2200) {
            this.isAttacking = false;
            this.isReturning = true;
        }
    }

    returnToPosition() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x += 20;
        if (this.x >= 2600) {
            this.isReturning = false;
        }
    }
}