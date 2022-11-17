class Sensors {
  _scoreText = document.querySelector('.game-score');
  _btnNext = document.querySelector('.btn-next');
  _lvls = document.querySelectorAll('.quiz__round');

  // _blockDoubleScore = false;
  // _score = 0;

  handlerBtnNext(handler) {
    this._btnNext.onclick = (e) => {
      handler();
    };
  }

  showRoundActive(roundIndex) {
    if (roundIndex > 0)
      this._lvls[roundIndex - 1].classList.remove('quiz__round--active');

    this._lvls[roundIndex].classList.add('quiz__round--active');
  }

  setBtnAvailable() {
    this._btnNext.classList.remove('btn-next--disabled');
  }

  resetOptions() {
    this._btnNext.classList.add('btn-next--disabled');
    this._blockDoubleScore = false;
  }

  addToScore(score) {
    // if (this._blockDoubleScore) return;

    // this._score += score;
    this._scoreText.textContent = `Score: ${score}`;
    // this._blockDoubleScore = true;
  }
}

export default new Sensors();
