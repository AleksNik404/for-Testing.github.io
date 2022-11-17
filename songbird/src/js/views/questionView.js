import { ICON_QUESTION, ICON_LOOSE, ICON_WIN } from '../config.js';

import { RIGHT_AUDIO_EFFECT } from '../config.js';
import { WRONG_AUDIO_EFFECT } from '../config.js';

import { VOLUME } from '../config.js';

class QuestionsView {
  _parrent = document.querySelector('.game__questions');
  _selection = [];
  _roundStatus = false;
  _roundScore = 5;

  handlerSelectQuestion(handler, winQuestID) {
    this._parrent.onclick = (e) => {
      const question = e.target.closest('.question');
      if (!question) return;

      const id = Number(question.dataset.question);
      const isWin = winQuestID === id ? true : false;

      if (!isWin) this.wrongChoice(question);
      if (isWin) this.rightChoice(question);

      handler(id, isWin, this._roundScore);
    };
  }

  wrongChoice(elem) {
    if (this._roundStatus) return;
    if (this._selection.includes(elem)) return;

    this._selection.push(elem);
    this._roundScore -= 1;

    this.playEffect(WRONG_AUDIO_EFFECT);

    elem.firstElementChild.classList.replace(ICON_QUESTION, ICON_LOOSE);
    elem.lastElementChild.classList.add('wrong-choice');
  }

  rightChoice(elem) {
    if (this._roundStatus) return;

    this.playEffect(RIGHT_AUDIO_EFFECT);
    this._roundStatus = true;

    elem.firstElementChild.classList.replace(ICON_QUESTION, ICON_WIN);
    elem.firstElementChild.classList.add('right-icon');
    elem.lastElementChild.classList.add('right-choice');
  }

  playEffect(AudioEffect) {
    const audio = new Audio(AudioEffect);
    audio.volume = VOLUME;
    audio.play();
  }

  _clear() {
    this._parrent.innerHTML = '';
  }

  resetOptions() {
    this._roundStatus = false;
    this._roundScore = 5;
  }

  render(data) {
    this._data = data;
    this._clear();
    this._parrent.insertAdjacentHTML('beforeend', this._generateTemplate());
  }

  _generateTemplate() {
    const html = this._data.map(({ id, name }) => {
      return `
            <div class="question" data-question=${id}>
              <button class="question__icon fa-solid ${ICON_QUESTION}"></button>
              <span class="question__text">${name}</span>
            </div>`;
    });

    html.sort(() => Math.random() - 0.5);

    return html.join('');
  }
}

export default new QuestionsView();
