import { audioList } from '../data/audios.js';
import PlayInfo from './play-info.js';

const Playlist = (_ => {

    let audios = audioList;
    let currentAudioIndex = 0;
    let currentAudio = new Audio(audios[currentAudioIndex].url);

    const playlistEL = document.querySelector(".playlist");

    const render = _ => {
        let markup = '';
        audios.forEach((audio, index) => {
            markup +=
                `<li class="playlist__audio  ${currentAudioIndex === index ? 'playlist__audio-active' : ''}">
                    <div class="playlist__play-pause">
                        <i class="fa ${toggleIcon(index)}"></i>
                    </div>
                    <div class="playlist__audio-details">
                        <span class="playlist__audio-title">${audio.title}</span><br>
                        <span class="playlist__audio-qari">${audio.qari}</span>
                    </div>
                    <span class="playlist__audio-duration">${audio.time}</>
                </li>`;
        });
        playlistEL.innerHTML = markup;
        PlayInfo.setState(currentAudio, audios);
    }

    const playAudio = index => {
        if (currentAudioIndex === index) {
            currentAudio.paused ? currentAudio.play() : currentAudio.pause();
            toggleIcon(index);
        } else {
            currentAudio.pause();
            currentAudioIndex = index;
            currentAudio.src = audios[currentAudioIndex].url;
            currentAudio.play();
        }
        render();
    }

    const playNextAudio = () => {
        currentAudioIndex !== audios.length - 1 ? currentAudioIndex++ : currentAudioIndex = 0;
        currentAudio.src = audios[currentAudioIndex].url;
        currentAudio.play();
        render();
    }

    const toggleIcon = index => {
        if (currentAudioIndex === index) {
            return currentAudio.paused ? 'fa-play' : 'fa-pause';
        } else {
            return 'fa-play';
        }
    }

    const listeners = _ => {
        playlistEL.addEventListener('click', (event) => {
            const audio = event.target.parentNode.parentNode;
            if (event.target.matches(".fa")) {
                playAudio([...event.target.parentNode.parentNode.parentNode.children].indexOf(audio));
            }
        });

        currentAudio.addEventListener('ended', () => {
            playNextAudio();
        });
    }

    const setState = () => {
        playAudio(currentAudioIndex);
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

PlayInfo.init();
export default Playlist;