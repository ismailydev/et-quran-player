const TrackBar = (_ => {
    //state
    let current = 0;
    let dur = 0;
    let width = 0;

    const trackBar = document.querySelector('.player__tracker-inner');

    const render = _ => {
        trackBar.style.width = `${width}%`;
    }

    const setState = (audio) => {
        current = audio.currentTime;
        dur = audio.duration;
        width = current / dur * 100;
        render();
    }

    const init = _ => {
        render();
    }

    return {
        init,
        setState
    }
})();

export default TrackBar;