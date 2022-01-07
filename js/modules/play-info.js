import Playlist from './playlist.js';
const PlayInfo = (_ => {

    let isPlaying = true;
    let numOfAudios = 0;

    const playPauseBtn = document.querySelector('.player__control');
    const playerCount = document.querySelector('.player__count');

    const render = _ => {
        !isPlaying ? playPauseBtn.innerHTML = 'Pause' : playPauseBtn.innerHTML = 'Play';
        playerCount.innerHTML = numOfAudios;
    }

    const listeners = _ => {
        playPauseBtn.addEventListener('click', () => {
            Playlist.setState();
            render();
        })
    }

    const setState = (currentAudio, audios) => {
        isPlaying = currentAudio.paused;
        numOfAudios = audios.length;
        render();
    }

    const init = _ => {
        render();
        listeners();
    }
    return {
        init,
        setState
    }
})();

export default PlayInfo;