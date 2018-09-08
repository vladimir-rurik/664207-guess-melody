
import AbstractView from "../abstract-view";

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
export default class LevelState extends AbstractView {
  constructor(state, svg) {
    super();
    this.state = state;
    this.svg = svg;
  }

  get template() {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line"
        stroke-dasharray="${this.svg.stroke}" stroke-dashoffset="${this.svg.offset}" style="filter: url(.#blur);
        transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>

    <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer__mins">${addFirstZero(this.state.time / 60)}</span>
      <span class="timer__dots">:</span>
      <span class="timer__secs">${addFirstZero(this.state.time % 60)}</span>
    </div>

    <div class="game__mistakes">
      ${new Array(this.state.restAttempts).fill(`<div class="wrong"></div>`).join(``)}
    </div>
    `;
  }
}
