export const INITIAL_GAME = Object.freeze({
  level: 0,
  attempts: 3,
  time: 0
});
/**
 * Смена уровней игры.
 * @param {Object} game - текущая игра
 * @param {number} level - текущий уровень игры
 * @return {Object} - игру с новым уровнем
 */
export const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};
