import gameData from '../games.js';

export class GameModel {
  _curRound = 0;
  _winQuestion;
  _blockDoubleScore = false;

  _score = 0;

  constructor(gameData) {
    this._gameData = gameData;
    this._lvlQty = gameData.length;

    this._state = {
      gameData: gameData,
      lvlQty: gameData.length,
      curRound: 0,
      winQuestion: null,
    };
  }

  addToScore(score) {
    if (this._blockDoubleScore) return;
    this._blockDoubleScore = true;

    this._score += score;
  }

  get score() {
    return this._score;
  }

  resetRoundScore() {
    this._missAnswers.clear();
  }

  get curRound() {
    return this._curRound;
  }

  get lvlQuestions() {
    return this._gameData[this._curRound];
  }

  get winQuestion() {
    const winIndex = this._winQuestion;
    return this.lvlQuestions[winIndex];
  }

  getOneQuestion(id) {
    return this.lvlQuestions.find((question) => question.id === id);
  }

  setNewRandomQuestion() {
    const randomNum = Math.trunc(Math.random() * this.lvlQuestions.length);
    this._winQuestion = randomNum;
    this._state.winQuestion = randomNum;
  }

  nextRound() {
    this._curRound += 1;
    this._blockDoubleScore = false;

    if (this.curRound === this._lvlQty) {
      const maxScore = window.localStorage.getItem('Griz-MaxScore');

      if (maxScore < this._score)
        window.localStorage.setItem('Griz-MaxScore', this._score);

      window.location.href = 'result.html';
    }
  }
}

export default new GameModel(gameData);
