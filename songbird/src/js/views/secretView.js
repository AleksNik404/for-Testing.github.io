import { UNKNOWN_TEXT, UNKNOWN_IMG } from '../config.js';
import { VOLUME } from '../config.js';

import { SecretAudio } from '../models/secretAudio.js';

class SecretView {
  _parrent = document.querySelector('.quiz__secret');

  _iconPlay = document.querySelector('#secret__play-icon');
  _iconVolume = document.querySelector('#secret__volume-icon');

  _nameQuestion = document.querySelector('#secret-name');
  _imgQuestion = document.querySelector('#secret-img');

  _music;
  _volumeAudio = VOLUME;

  _audioIsDrag = false;

  // _data;

  resetOptions() {
    this._iconPlay.classList.replace('fa-circle-pause', 'fa-circle-play');

    this._music.pause();
    this._music._durationBar.value = 0;
    this._music._durationBgBar.style.width = '0%';
    this._music = null;

    this._nameQuestion.textContent = UNKNOWN_TEXT;
    this._imgQuestion.src = UNKNOWN_IMG;
  }

  showWinQuestion({ image, name }) {
    this._nameQuestion.textContent = name;
    this._imgQuestion.src = image;
  }

  handlerPlayAudio(handler) {
    this._parrent.onclick = (e) => {
      if (e.target.id !== 'secret__play-icon') return;

      if (!this._music.paused) this.pauseSong();
      else {
        handler();
        this.playSong();
      }
    };
  }

  playSong() {
    this._music.play();
    this._iconPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
  }

  // if не проверил работоспособоность.
  pauseSong() {
    if (this._music) this._music.pause();
    this._iconPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
  }

  setWinAudio(audioSrc) {
    this._music = new SecretAudio(audioSrc);
    this._music.volume = this._volumeAudio;
  }

  updateMusicControllers() {
    this._music.ontimeupdate = () => this.updateTimeAudio(this._audioIsDrag);
    this._music._volumeBar.oninput = () => this.updateVolumeAudio();
    this._music._durationBar.oninput = () => this.updateDurationAudioDrag();
    this._music._durationBar.onchange = () => this.updateDurationAudio();
  }

  updateTimeAudio(audioIsDrag) {
    const timeFormat = (time) => String(Math.trunc(time)).padStart(2, '0');

    const currentMinutes = timeFormat(this._music.currentTime / 60);
    const currentSeconds = timeFormat(this._music.currentTime % 60);
    const durationMinutes = timeFormat(this._music.duration / 60);
    const durationSeconds = timeFormat(this._music.duration % 60);

    const progressPercent =
      (this._music.currentTime / this._music.duration) * 100;

    if (!this._audioIsDrag) {
      this._music._durationBar.value = Math.ceil(progressPercent);
      this._music._durationBgBar.style.width = Math.ceil(progressPercent) + '%';
    }

    this._music._durTime.textContent = `${durationMinutes}:${durationSeconds}`;
    this._music._curTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }

  updateDurationAudioDrag() {
    this._audioIsDrag = true;

    this._music._durationBgBar.style.width =
      this._music._durationBar.value + '%';
  }

  updateDurationAudio() {
    this._audioIsDrag = false;

    this._music.currentTime =
      (this._music.duration * this._music._durationBar.value) / 100;
  }

  updateVolumeAudio() {
    this._music.volume = this._music._volumeBar.value / 100;
    this._volumeAudio = this._music._volumeBar.value / 100;
    this._music._volumeBgBar.style.width = this._music._volumeBar.value + '%';
  }
}

export default new SecretView();
