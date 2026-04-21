let canvas;
let world;
let keyboard = new Keyboard();
let isGameMuted = false;

function backToHomeScreen() {
    document.getElementById('endscreen_container').classList.add('d_none')
    document.getElementById('startscreen-container').classList.remove('d_none')
}

function startGame() {
    if (world && world.audio) {
        world.audio.stopAll();
    }
    document.getElementById('startscreen-container').classList.add('d_none');
    initLevel();
    init();
}

function restartGame() {
    if (world && world.audio) {
        world.audio.stopAll();
    }
    document.getElementById('endscreen_container').classList.add('d_none');
    initLevel();
    init();
}

function togglePause() {
    document.getElementById('pause_btn').blur();
    world.gamePaused = !world.gamePaused;

    if (!world.gamePaused) {
        world.draw();
        if (!isGameMuted) world.audio.SOUNDS.background.play();
    } else {
        world.audio.SOUNDS.background.pause();
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('pause_btn').classList.remove('d_none')
}

window.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (e.code == 'ArrowUp') {
        keyboard.UP = true;
    }

    if (e.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (e.code == 'Space') {
        keyboard.SPACE = true;
    }

    if (e.code == 'KeyD') {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (e.code == 'ArrowUp') {
        keyboard.UP = false;
    }

    if (e.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (e.code == 'Space') {
        keyboard.SPACE = false;
    }

    if (e.code == 'KeyD') {
        keyboard.D = false;
    }
});


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

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function toggleInfo() {
    let info = document.getElementById('overlay');
    info.classList.toggle('d_none');

}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        let info = document.getElementById('overlay');
        if (!info.classList.contains('d_none')) {
            info.classList.add('d_none');
        }
    }
})

function toggleMute() {
    isGameMuted = !isGameMuted;
    if (world && world.audio) {
        world.audio.muteAll(isGameMuted);
    }
    updateMuteButton();
    document.getElementById('music_btn').blur();
}

function updateMuteButton() {
    let btn = document.getElementById('music_btn');
    if (isGameMuted) {
        btn.style.opacity = "0.4";
    } else {
        btn.style.opacity = "1";
    }
}