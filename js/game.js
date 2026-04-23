/** @type {HTMLCanvasElement} */
let canvas;

/** @type {World} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

// /** @type {boolean} - Global state to track if the game is muted */
// let isGameMuted = false;
/** @type {boolean} - Global state to track if the game is muted, loaded from localStorage */
let isGameMuted = localStorage.getItem('isGameMuted') === 'true';

/**
 * Returns the player from the end screen to the main start screen.
 */
function backToHomeScreen() {
    document.getElementById('endscreen_container').classList.add('d_none');
    document.getElementById('startscreen-container').classList.remove('d_none');
    document.getElementById('control_btns').classList.add('d_none');
}

/**
 * Starts the game, initializes the level, and checks for touch devices 
 * to display mobile controls if necessary.
 */
function startGame() {
    document.getElementById('impressum_btn').classList.add('d_none');

    if (world && world.audio) {
        world.audio.stopAll();
    }
    document.getElementById('startscreen-container').classList.add('d_none');
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        document.getElementById('control_btns').classList.remove('d_none');
    }
    initLevel();
    init();
}

/**
 * Restarts the game by stopping existing audio and re-initializing the level.
 */
function restartGame() {
    if (world && world.audio) {
        world.audio.stopAll();
    }
    document.getElementById('impressum_btn').classList.add('d_none');
    document.getElementById('endscreen_container').classList.add('d_none');
    document.getElementById('control_btns').classList.remove('d_none');
    initLevel();
    init();
}

/**
 * Toggles the pause state of the game and updates the UI and audio accordingly.
 */
function togglePause() {
    document.getElementById('pause_btn').blur();
    world.gamePaused = !world.gamePaused;
    updatePauseButton();
    if (!world.gamePaused) {
        if (world.character) {
            world.character.resetIdleTimer();
        }
        world.draw();
        if (!isGameMuted) world.audio.SOUNDS.background.play();
    } else {
        world.audio.SOUNDS.background.pause();
    }
}

/**
 * Updates the visual opacity of the pause button based on the game state.
 */
function updatePauseButton() {
    let btn = document.getElementById('pause_btn');
    if (world.gamePaused) {
        btn.style.opacity = "0.4";
    } else {
        btn.style.opacity = "1";
    }
}

/**
 * Main initialization function to create the World instance and 
 * handle initial mute settings.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('pause_btn').classList.remove('d_none')
    if (isGameMuted) {
        world.audio.muteAll(true);
    }
    if (isGameMuted) {
        world.audio.muteAll(true);
    }
}

/**
 * Global event listener for keyboard keydown events to update the keyboard state.
 */
window.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowRight') keyboard.RIGHT = true;
    if (e.code == 'ArrowLeft') keyboard.LEFT = true;
    if (e.code == 'ArrowUp') keyboard.UP = true;
    if (e.code == 'ArrowDown') keyboard.DOWN = true;
    if (e.code == 'Space') keyboard.SPACE = true;
    if (e.code == 'KeyD') keyboard.D = true;
});

/**
 * Global event listener for keyboard keyup events to update the keyboard state.
 */
window.addEventListener("keyup", (e) => {
    if (e.code == 'ArrowRight') keyboard.RIGHT = false;
    if (e.code == 'ArrowLeft') keyboard.LEFT = false;
    if (e.code == 'ArrowUp') keyboard.UP = false;
    if (e.code == 'ArrowDown') keyboard.DOWN = false;
    if (e.code == 'Space') keyboard.SPACE = false;
    if (e.code == 'KeyD') keyboard.D = false;
});

/**
 * Toggles the browser fullscreen mode.
 */
function fullscreen() {
    let container = document.querySelector('#fullscreen');
    let fullscreenBtn = document.querySelector('#fullscreen-btn')

    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        openFullscreen(container);
    } else {
        closeFullscreen();
    }
    fullscreenBtn.blur();
}

/**
 * Requests the browser to enter fullscreen mode for a specific element.
 * @param {HTMLElement} elem - The element to be displayed in fullscreen.
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

/**
 * Exits the browser fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Toggles the visibility of the information overlay.
 */
function toggleInfo() {
    let info = document.getElementById('overlay');
    info.classList.toggle('d_none');
}

/**
 * Global event listener to close the info/impressum overlay when the Escape key is pressed.
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        let info = document.getElementById('overlay');
        if (!info.classList.contains('d_none')) {
            info.classList.add('d_none');
        }
    }
    if (event.key === 'Escape') {
        let info = document.getElementById('impressum-overlay');
        if (!info.classList.contains('d_none')) {
            info.classList.add('d_none');
        }
    }
})


/**
 * Closes the impressum overlay when clicking on the background.
 */
document.addEventListener('click', (event) => {
    const impressumOverlay = document.getElementById('impressum-overlay');
    if (event.target === impressumOverlay) {
        toggleImpressum();
    }

    const infoOverlay = document.getElementById('overlay');
    if (event.target === infoOverlay) {
        toggleInfo();
    }
});


/**
 * Toggles the game audio between muted and unmuted states.
 */
function toggleMute() {
    isGameMuted = !isGameMuted;
    localStorage.setItem('isGameMuted', isGameMuted);
    if (world && world.audio) {
        world.audio.muteAll(isGameMuted);
    }
    if (!isGameMuted && !world.gamePaused) {
        world.audio.SOUNDS.background.play();
    }
    updateMuteButton();
    document.getElementById('music_btn').blur();
}

/**
 * Updates the visual opacity of the mute button based on the isGameMuted state.
 */
function updateMuteButton() {
    let btn = document.getElementById('music_btn');
    if (isGameMuted) {
        btn.style.opacity = "0.4";
    } else {
        btn.style.opacity = "1";
    }
}

/**
 * Entry point for binding all mobile-related touch events.
 */
function bindMobileEvents() {
    bindMovementEvents();
    bindActionEvents();
    bindUiEvents();
}

/**
 * Generic helper to bind touch events to an element for keyboard simulation.
 * @param {string} id - The ID of the HTML element.
 * @param {string} key - The property name in the keyboard object.
 */
function addTouchEvents(id, key) {
    const element = document.getElementById(id);
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

/**
 * Binds touch events for character movement (Left/Right).
 */
function bindMovementEvents() {
    addTouchEvents('left_btn', 'LEFT');
    addTouchEvents('right_btn', 'RIGHT');
}

/**
 * Binds touch events for character actions (Jump/Throw).
 */
function bindActionEvents() {
    addTouchEvents('up_btn', 'SPACE');
    addTouchEvents('throw_btn', 'D');
}

/**
 * Binds click/touch events for UI functional buttons (Pause, Mute, Info, Fullscreen).
 */
function bindUiEvents() {
    const functionalBtns = [
        { id: 'pause_btn', action: togglePause },
        { id: 'music_btn', action: toggleMute },
        { id: 'info_btn', action: toggleInfo },
        { id: 'fullscreen-btn', action: fullscreen }
    ];
    functionalBtns.forEach(btnObj => {
        const element = document.getElementById(btnObj.id);
        if (element) {
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                btnObj.action();
            });
        }
    });
}

/**
 * Global load listener to initialize mobile events once the DOM is ready.
 */
window.addEventListener('load', () => {
    bindMobileEvents();
    updateMuteButton();
});

/**
 * Toggles the visibility of the impressum overlay.
 */
function toggleImpressum() {
    let impressum = document.getElementById('impressum-overlay');
    impressum.classList.toggle('d_none');
}

/**
 * Add it to your global Escape listener so it closes easily.
 */
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'Escape') {
//         document.getElementById('impressum-overlay').classList.add('d_none');
//     }
// });