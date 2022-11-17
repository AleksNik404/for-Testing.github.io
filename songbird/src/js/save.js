// //////////APP//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function updateTimeAudio() {
//   const timeFormat = (time) => String(Math.trunc(time)).padStart(2, '0');

//   const currentMinutes = timeFormat(this.currentTime / 60);
//   const currentSeconds = timeFormat(this.currentTime % 60);
//   const durationMinutes = timeFormat(this.duration / 60);
//   const durationSeconds = timeFormat(this.duration % 60);

//   const progressPercent = (this.currentTime / this.duration) * 100;

//   secretView._music._durationBar.value = progressPercent;
//   secretView._music._durationBgBar.style.width =
//     Math.ceil(progressPercent) + '%';

//   secretView._music._durTime.textContent = `${durationMinutes}:${durationSeconds}`;
//   secretView._music._curTime.textContent = `${currentMinutes}:${currentSeconds}`;
// }

// function updateVolumeAudio() {
//   secretView._music.volume = secretView._music._volumeBar.value / 100;

//   secretView._music._volumeBgBar.style.width =
//     secretView._music._volumeBar.value + '%';
// }
// ///////SECRET///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// secretView.handlerUpdateTime(updateTimeAudio);
// secretView.handlerUpdateVolume(updateVolumeAudio);

import { ICON_QUESTION } from '../config.js';
import { ICON_WIN } from '../config.js';
import { ICON_LOOSE } from '../config.js';

import { TEXT_BEFORE_GUESS } from '../config.js';

class AnswersView {
  _parrent = document.querySelector('.game__answer');

  _description = document.querySelector('#answer-description');
  _img = document.querySelector('#answer_img');
  _name = document.querySelector('#answer-name');

  _iconPlay = document.querySelector('#volume__play-icon');
  _iconVolume = document.querySelector('#volume__volume-icon');

  // _data;
  _winAudio;
  // _volumeAudio;

  handlerPlayAudio(handler) {
    this._parrent.onclick = (e) => {
      if (e.target.id !== 'volume__play-icon') return;

      this._winAudio.paused ? this.playSong() : this.pauseSong();
    };
  }

  showMenu(question) {
    this._description.textContent = question.description;
    this._img.src = question.image;
    this._name.textContent = question.name;

    document.querySelector('.answer-box__details-box').hidden = false;
    document.querySelector('#answer-img-box').hidden = false;
  }

  resetOptions() {
    // this.pauseSong();

    document.querySelector('.answer-box__details-box').hidden = true;
    document.querySelector('#answer-img-box').hidden = true;
    this._description.textContent = TEXT_BEFORE_GUESS;
  }

  playSong() {
    this._winAudio.play();
    this._iconPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
  }

  pauseSong() {
    this._winAudio.pause();
    this._iconPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
  }

  // setWinAudio(audioSrc, VOLUME) {
  //   console.log(audioSrc);
  //   console.log(VOLUME);
  //   this._winAudio = new SecretAudio(audioSrc);
  //   this._winAudio.volume = VOLUME;
  // }

  handlerUpdateTime(handler) {
    this._winAudio.ontimeupdate = handler;
  }

  handlerUpdateVolume(handler) {
    this._winAudio._volumeBar.oninput = handler;
  }
}

export default new AnswersView();
