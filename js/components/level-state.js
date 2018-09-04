import {createElementFromString} from '../utils';

/**
 * Шаблон состояния игры в виде таймера и оставшихся попыток
 * @param {Object} state - Текущее состояние игры
 * @param {Object} svg - параметры зарисовки круга
 * @return {Node}
 */
export default (state, svg) => {
  const addFirstZero = (num) => (`0${Math.floor(num)}`).slice(-2);
  const mistakes = new Array(state.user.restAttempts).fill(`<div class="wrong"></div>`).join(``);

  const levelState = `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line"
        stroke-dasharray="${svg.stroke}" stroke-dashoffset="${svg.offset}" style="filter: url(.#blur);
        transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>

    <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer__mins">${addFirstZero(state.time / 60)}</span>
      <span class="timer__dots">:</span>
      <span class="timer__secs">${addFirstZero(state.time % 60)}</span>
    </div>

    <div class="game__mistakes">
      ${mistakes}
    </div>
  `;

  return createElementFromString(levelState);
};
