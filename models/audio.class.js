class Audios {

    isMuted = false;
    SOUNDS = {
        background: new Audio('audio/El_Pollo_Loco.mp3'),               
        coin: new Audio('audio/collect_coin.mp3'),                      
        bottle_collect: new Audio('audio/collect_bottle.mp3'),          
        bottle_smash: new Audio('audio/bottle_break.mp3'),              
        jump: new Audio('audio/jump.mp3'),                              
        jump_kill: new Audio('audio/jump_kill.mp3'),                   
        walk: new Audio('audio/run.mp3'),                               
        throw: new Audio('audio/throw.mp3'),                            
        hurt_character: new Audio('audio/hurt_character.mp3'),          
        chicken_kill: new Audio('audio/chicken_kill.mp3'),
        hurt_endboss: new Audio('audio/hurt_endboss.mp3')
    };

    constructor() {
    }

    setupBackgroundMusic(soundName) {
        let song = this.SOUNDS[soundName];
        if (song) {
            song.loop = true;
            song.volume = 0.3;
            song.playbackRate = 1.25;
            song.play();
        }
    }

    playLoop(soundName) {
        let sound = this.SOUNDS[soundName];
        if (sound) {
            sound.loop = true; 
            if (sound.paused) { 
                sound.play();
            }
        }
    }

    stop(soundName) {
        let sound = this.SOUNDS[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    play(soundName) {
        let sound = this.SOUNDS[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    stop(soundName) {
        if (this.SOUNDS[soundName]) {
            this.SOUNDS[soundName].pause();
        }
    }
    
    stopAll() {
        Object.keys(this.SOUNDS).forEach(key => {
            this.SOUNDS[key].pause();
            this.SOUNDS[key].currentTime = 0;
        });
    }

    muteAll(status) {
        this.isMuted = status;
        Object.keys(this.SOUNDS).forEach(key => {
            this.SOUNDS[key].muted = status;
        });
    }
}

