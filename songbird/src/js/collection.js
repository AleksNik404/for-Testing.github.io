import gameData from './games.js';

const grid = document.querySelector('.collection-box');

let html = '';

const flatGameData = gameData.flat();

// Делал в последние часы перед сдачей, уж как вышло. За производительность не думал в этот момент.

flatGameData.map(({ name, description, image, audio }, index) => {
  html += `
            <div class="game__answer" data-id="${index}">
              <div class="answer-box">
                <div id="answer-img-box" class="img-box answer-img-box">
                  <img id="answer_img" class="img" src="${image}" alt="game img" />
                </div>
                <p id="answer-description" class="answer-box__text">${description}</p>
                <div class="answer-box__details-box">
                  <h3 id="answer-name" class="secret__text">${name}</h3>  
                  <div class="secret__audio-player audio-player">
                    <div class="audio-player__song">
                      <button id="answer__play-icon" class="audio-player__icon fa-regular fa-circle-play"></button>  
                      <div class="audio-player__duration-box">
                        <div id="durationBar" class="duration-box__bg-answer"></div>
                        <input id="answer-audio-duration" class="audio-player__duration" type="range" min="0" max="100" value="0" />
                        <div id="answer-cur-time" class="audio-player__cur-time">00:00</div>
                        <div id="answer-dur-time" class="audio-player__dur-time">00:00</div>
                      </div>
                    </div>
                    <div class="audio-player__sound">
                      <button id="answer__volume-icon" class="audio-player__icon fa-sharp fa-solid fa-volume-high"></button>  
                      <div class="audio-player__volume-box">
                        <div id="volumeBar" class="volume-box__bg-answer"></div>
                        <input id="answer-audio-volume" class="audio-player__volume max-width-sm" type="range" min="0" max="100" value="10"/>
                      </div>
                    </div>  
                    <audio src=""></audio>
                  </div>
                </div>
              </div>
            </div>
  `;
});

grid.insertAdjacentHTML('afterbegin', html);

class gameCard {
  constructor(parent) {
    this.parent = parent;
    this.audioIsDrag = false;

    this.gameIndex = parent.dataset.id;
    this.game = flatGameData[parent.dataset.id];

    this.audio = parent.querySelector('audio');
    this.audio.volume = 0.05;

    this.playIcon = parent.querySelector('#answer__play-icon');
    this.volIcon = parent.querySelector('#answer__volume-icon');

    this.durationControl = parent.querySelector('#answer-audio-duration');
    this.volumeControl = parent.querySelector('#answer-audio-volume');

    this.durationBar = parent.querySelector('#durationBar');
    this.volumeBar = parent.querySelector('#volumeBar');

    this.durTime = parent.querySelector('#answer-dur-time');
    this.curTime = parent.querySelector('#answer-cur-time');

    this.audio.ontimeupdate = () => this.updateTimeAudio();
    this.durationControl.oninput = () => this.updateDurationAudioDrag();
    this.durationControl.onchange = () => this.updateDurationAudio();
    this.volumeControl.oninput = () => this.updateVolumeAudio();
  }

  updateVolumeAudio() {
    this.audio.volume = this.volumeControl.value / 100;
    this.volumeBar.style.width = this.volumeControl.value + '%';
  }

  updateDurationAudioDrag() {
    this.audioIsDrag = true;
    this.durationBar.style.width = this.durationControl.value + '%';
  }

  updateDurationAudio() {
    this.audioIsDrag = false;

    if (!this.audio.currentTime) return;
    this.audio.currentTime =
      (this.audio.duration * this.durationControl.value) / 100;
  }

  updateTimeAudio(audioIsDrag) {
    const timeFormat = (time) => String(Math.trunc(time)).padStart(2, '0');

    const currentMinutes = timeFormat(this.audio.currentTime / 60);
    const currentSeconds = timeFormat(this.audio.currentTime % 60);
    const durationMinutes = timeFormat(this.audio.duration / 60);
    const durationSeconds = timeFormat(this.audio.duration % 60);

    const progressPercent =
      (this.audio.currentTime / this.audio.duration) * 100;

    if (!this.audioIsDrag && progressPercent) {
      this.durationControl.value = Math.ceil(progressPercent);
      this.durationBar.style.width = Math.ceil(progressPercent) + '%';
      this.durTime.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    this.curTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }

  async playSong() {
    if (!this.audio.currentTime) this.audio.src = this.game.githubLink;

    await this.audio.play();
    this.audio.currentTime =
      (this.audio.duration * this.durationControl.value) / 100;

    this.playIcon.classList.replace('fa-circle-play', 'fa-circle-pause');
  }

  pauseSong() {
    this.audio.pause();
    this.playIcon.classList.replace('fa-circle-pause', 'fa-circle-play');
  }
}

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

grid.addEventListener('click', (ev) => {
  const id = ev.target.closest('[data-id]').dataset.id;

  if (ev.target.id === 'answer__play-icon') {
    if (ev.target.classList.contains('fa-circle-play')) allCards[id].playSong();
    else if (ev.target.classList.contains('fa-circle-pause'))
      allCards[id].pauseSong();
  }

  if (ev.target.id === 'answer__volume-icon') {
  }
});

const allCards = [];

grid
  .querySelectorAll('.game__answer')
  .forEach((parentBox) => allCards.push(new gameCard(parentBox)));
