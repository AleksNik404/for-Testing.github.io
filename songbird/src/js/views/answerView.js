import { VOLUME } from '../config.js';
import { TEXT_BEFORE_GUESS } from '../config.js';

import { AnswerAudio } from '../models/secretAudio.js';

class AnswersView {
  _parrent = document.querySelector('.game__answer');

  _iconPlay = document.querySelector('#answer__play-icon');
  _iconVolume = document.querySelector('#answer__volume-icon');

  _name = document.querySelector('#answer-name');
  _img = document.querySelector('#answer_img');
  _description = document.querySelector('#answer-description');

  _music;
  _volumeAudio = VOLUME;

  _audioIsDrag = false;

  // _data;

  resetOptions() {
    // this.pauseSong();

    document.querySelector('.answer-box__details-box').hidden = true;
    document.querySelector('#answer-img-box').hidden = true;
    this._description.textContent = TEXT_BEFORE_GUESS;

    this.resetControls();
  }

  async resetControls() {
    if (!this._music) return;
    this._iconPlay.classList.replace('fa-circle-pause', 'fa-circle-play');

    await this._music.pause();

    this._music._durationBar.value = 0;
    this._music._durationBgBar.style.width = '0%';

    this._music._durTime.textContent = `00:00`;
    this._music._curTime.textContent = `00:00`;
  }

  showMenu(question) {
    this._description.textContent = question.description;
    this._img.src = question.image;
    this._name.textContent = question.name;

    document.querySelector('.answer-box__details-box').hidden = false;
    document.querySelector('#answer-img-box').hidden = false;
  }

  handlerPlayAudio(handler) {
    this._parrent.onclick = (e) => {
      if (e.target.id !== 'answer__play-icon') return;

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

  pauseSong() {
    if (this._music) this._music.pause();
    this._iconPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
  }

  setWinAudio(audioSrc) {
    this._music = new AnswerAudio(audioSrc);
    this._music.volume = this._volumeAudio;
  }

  updateMusicControllers() {
    this._music.ontimeupdate = () => this.updateTimeAudio();
    this._music._volumeBar.oninput = () => this.updateVolumeAudio();
    this._music._durationBar.oninput = () => this.updateDurationAudioDrag();
    this._music._durationBar.onchange = () => this.updateDurationAudio();
  }

  updateTimeAudio() {
    const timeFormat = (time) => String(Math.trunc(time)).padStart(2, '0');

    const currentMinutes = timeFormat(this._music.currentTime / 60);
    const currentSeconds = timeFormat(this._music.currentTime % 60);
    const durationMinutes = timeFormat(this._music.duration / 60);
    const durationSeconds = timeFormat(this._music.duration % 60);

    const progressPercent =
      (this._music.currentTime / this._music.duration) * 100;

    if (!this._audioIsDrag && progressPercent) {
      this._music._durationBar.value = Math.ceil(progressPercent);
      this._music._durationBgBar.style.width = Math.ceil(progressPercent) + '%';
      this._music._durTime.textContent = `${durationMinutes}:${durationSeconds}`;
    }

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

export default new AnswersView();
