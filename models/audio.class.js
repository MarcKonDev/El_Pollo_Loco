/**
 * Class representing the audio management system for the game.
 * Handles sound effects, background music, looping, and volume control.
 */
class Audios {

    /** @type {boolean} - Indicates whether all game sounds are currently muted. */
    isMuted = false;

    /** * @type {Object<string, HTMLAudioElement>} - A collection of all audio objects used in the game.
     */
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

    /**
     * Creates an instance of the Audios class.
     */
    constructor() {
    }

    /**
     * Configures and starts the background music.
     * @param {string} soundName - The key of the sound in the SOUNDS object.
     */
    setupBackgroundMusic(soundName) {
        let song = this.SOUNDS[soundName];
        if (song) {
            song.loop = true;
            song.volume = 0.3;
            song.playbackRate = 1.25;
            song.play();
        }
    }

    /**
     * Plays a specific sound in a continuous loop.
     * @param {string} soundName - The key of the sound in the SOUNDS object.
     */
    playLoop(soundName) {
        let sound = this.SOUNDS[soundName];
        if (sound) {
            sound.loop = true; 
            if (sound.paused) { 
                sound.play();
            }
        }
    }

    /**
     * Stops a sound and resets its playback position to the beginning.
     * @param {string} soundName - The key of the sound in the SOUNDS object.
     */
    stop(soundName) {
        let sound = this.SOUNDS[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Plays a sound from the beginning.
     * @param {string} soundName - The key of the sound in the SOUNDS object.
     */
    play(soundName) {
        let sound = this.SOUNDS[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    /**
     * Pauses a specific sound.
     * @param {string} soundName - The key of the sound in the SOUNDS object.
     */
    stop(soundName) {
        if (this.SOUNDS[soundName]) {
            this.SOUNDS[soundName].pause();
        }
    }
    
    /**
     * Stops all sounds in the SOUNDS collection and resets their playback position.
     */
    stopAll() {
        Object.keys(this.SOUNDS).forEach(key => {
            this.SOUNDS[key].pause();
            this.SOUNDS[key].currentTime = 0;
        });
    }

    /**
     * Mutes or unmutes all sounds in the SOUNDS collection.
     * @param {boolean} status - True to mute all sounds, false to unmute.
     */
    muteAll(status) {
        this.isMuted = status;
        Object.keys(this.SOUNDS).forEach(key => {
            this.SOUNDS[key].muted = status;
        });
    }
}