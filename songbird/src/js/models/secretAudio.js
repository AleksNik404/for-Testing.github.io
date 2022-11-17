export class SecretAudio extends Audio {
  _durationBar = document.querySelector('#secret-audio-duration');
  _durationBgBar = document.querySelector('.duration-box__bg-secret');

  _volumeBar = document.querySelector('#secret-audio-volume');
  _volumeBgBar = document.querySelector('.volume-box__bg-secret');

  _curTime = document.querySelector('#secret-cur-time');
  _durTime = document.querySelector('#secret-dur-time');
}

export class AnswerAudio extends Audio {
  _durationBar = document.querySelector('#answer-audio-duration');
  _durationBgBar = document.querySelector('.duration-box__bg-answer');

  _volumeBar = document.querySelector('#answer-audio-volume');
  _volumeBgBar = document.querySelector('.volume-box__bg-answer');

  _curTime = document.querySelector('#answer-cur-time');
  _durTime = document.querySelector('#answer-dur-time');
}

// const audioSecretBG = document.querySelector('.duration-box__bg-secret');
// const volumeSecretBG = document.querySelector('.volume-box__bg-secret');

// const audioAnswerBG = document.querySelector('.duration-box__bg-answer');
// const volumeAnswerBG = document.querySelector('.volume-box__bg-answer');
