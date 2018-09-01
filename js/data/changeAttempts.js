import {MAX_NUM_OF_ATTEMPTS} from './scoring';

export const GAME_OVER = `Game Over`;

/**
 * Изменение кол-ва попыток ( жизней )
 * @param {Object} game - текущая игра
 * @param {number} attempts - текущее кол-во попыток
 * @return {Object} - игру с новым кол-вом попыток
 */
export const changeAttempts = (game, attempts) => {
  if (typeof attempts !== `number`) {
    throw new Error(`Attempt count should be of type number`);
  }

  if (attempts < 0) {
    throw new Error(`Attempt count should not be negative value`);
  }

  if (attempts > MAX_NUM_OF_ATTEMPTS) {
    throw new Error(`Attempt count cannot exceed the maximum attempt`);
  }

  if (attempts === 0) {
    return GAME_OVER;
  }

  const newGame = Object.assign({}, game, {
    attempts
  });
  return newGame;
};
