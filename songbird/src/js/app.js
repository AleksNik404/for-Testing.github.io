import gameModel from './models/model.js';

import secretView from './views/secretView.js';
import questionView from './views/questionView.js';
import answerView from './views/answerView.js';
import sensorsView from './views/sensorsView.js';

// import { SecretAudio, AnswerAudio } from './models/secretAudio.js';

import { ICON_QUESTION } from './config.js';
import { ICON_WIN } from './config.js';
import { ICON_LOOSE } from './config.js';
import { VOLUME } from './config.js';
import model from './models/model.js';

// document.querySelector('.btn-next').addEventListener('click', (e) => {
//   gameModel.nextRound();

//   answerView.hiddenMenu();

//   secretView.resetOptions();

//   startRound();
// });

const tryToGuess = (id, isWin, roundScore) => {
  answerView.resetControls();
  answerView.setWinAudio(gameModel.getOneQuestion(id).githubLink);
  answerView.handlerPlayAudio(pauseAllSong);
  answerView.updateMusicControllers();

  answerView.showMenu(gameModel.getOneQuestion(id));

  if (isWin) {
    secretView.pauseSong();
    secretView.showWinQuestion(gameModel.getOneQuestion(id));
    sensorsView.setBtnAvailable();

    // sensorsView.addToScore(roundScore);

    model.addToScore(roundScore);
    sensorsView.addToScore(model.score);
  } else {
    // console.log(scoreRound);
  }
};

const nextRound = () => {
  answerView.resetOptions();
  questionView.resetOptions();
  secretView.resetOptions();
  sensorsView.resetOptions();

  gameModel.nextRound();
  startRound();
};

const pauseAllSong = () => {
  secretView.pauseSong();
  answerView.pauseSong();
};

function startRound() {
  gameModel.setNewRandomQuestion();

  secretView.setWinAudio(gameModel.winQuestion.githubLink);
  secretView.handlerPlayAudio(pauseAllSong);
  secretView.updateMusicControllers();

  questionView.render(gameModel.lvlQuestions);
  questionView.handlerSelectQuestion(tryToGuess, gameModel.winQuestion.id);

  sensorsView.handlerBtnNext(nextRound);
  sensorsView.showRoundActive(model.curRound);
}

/////Init
startRound();
