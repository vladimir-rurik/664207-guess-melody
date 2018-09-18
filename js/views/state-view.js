import AbstractView from "./abstract-view";
import {INITIAL_STATE} from "../data/results";
import Application from "../application";

/**
 * Добавление первого нуля перед натуральным однозначным числом
 * @param {number} num
 * @return {string}
 */
const addFirstZero = (num) => (`0${Math.floor(num)}`).slice(-2);

/**
 * Шаблон состояния игры в виде таймера и оставшихся попыток
 * @param {Object} state - Текущее состояние игры
 * @param {Object} svg - параметры зарисовки круга
 * @return {Node}
 */
export default class StateView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this._initialTime = INITIAL_STATE.time;
    this.mistakes = INITIAL_STATE.attempts - this.state.restAttempts;
  }

  get timeFinished() {
    return this.state.restTime >= 30 ? `` : `timer__value--finished`;
  }

  get templateSvg() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer__line"
          style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
    `;
  }

  get templateTimerValue() {
    return `
      <div class="timer__value ${this.timeFinished}" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${addFirstZero(this.state.restTime / 60)}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${addFirstZero(this.state.restTime % 60)}</span>
      </div>
    `;
  }

  get template() {
    return `
    <header class="game__header">
      <a class="game__back" href="#">
        <span class="visually-hidden">Сыграть ещё раз</span>
        <img class="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию">
      </a>

      ${this.templateSvg}
      ${this.templateTimerValue}

      <div class="game__mistakes">
        ${new Array(this.mistakes).fill(`<div class="wrong"></div>`).join(``)}
      </div>
    </header>
    `;
  }

  get indicator() {
    if (!this._timerLineElement) {
      this._timerLineElement = this.element.querySelector(`.timer__line`);
    }
    return this._timerLineElement;
  }

  get timerValue() {
    if (!this._timerValueElement) {
      this._timerValueElement = this.element.querySelector(`.timer__value`);
    }
    return this._timerValueElement;
  }

  getStroke(radius, restTime) {
    const strokeDashArray = 2 * Math.PI * radius;
    const timeToStrokeRatio = restTime / this._initialTime * strokeDashArray;
    const strokeDashOffset = strokeDashArray - timeToStrokeRatio;
    return {
      array: strokeDashArray,
      offset: strokeDashOffset
    };
  }

  onTimerRefresh(state) {
    this.state = state;
    const circleRadius = this.indicator.attributes.r.value;
    const stroke = this.getStroke(circleRadius, this.state.restTime);
    this.indicator.setAttribute(`stroke-dasharray`, `${stroke.array}`);
    this.indicator.setAttribute(`stroke-dashoffset`, `${stroke.offset}`);

    this.timerValue.innerHTML = this.templateTimerValue;
  }

  bind() {
    // back to main screen option
    const welcomeBackBtn = this.element.querySelector(`.game__back`);
    welcomeBackBtn.addEventListener(`click`, () => Application.showDialog());
  }
}
