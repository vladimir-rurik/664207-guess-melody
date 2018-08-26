/*
 * Получение результов игрока
 * @param {Array} allUserResults - Массив результатов игр других игроков
 * @param {number} points - количество заработанных очков
 * @return {Array} - Массив с результами игрока
 */
export const getResults = (allUserResults, points) => {
  const stats = [...allUserResults];
  stats.push(points);
  stats.sort((a, b) => a - b);

  const userCount = stats.length;
  const userPosition = userCount - stats.indexOf(points);
  const userPercent = Math.round((userCount - userPosition) / userCount * 100);

  return [userPosition, userCount, userPercent];
};

/*
 * Вывод сообщения с результами игрока
 * @param {Array} allUserResults - Массив результатов игр других игроков
 * @param {Object} userResult - Объект результата игрока
 * @param {number} userResult.points - количество заработанных очков
 * @param {number} userResult.restNotes - оставшееся количество попыток
 * @param {number} userResult.restTime - оставшееся количество времени
 * @return {string} - Сообщение о результате игрока
 */
export const printResults = (allUserResults, userResult) => {
  if (userResult.restNotes === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  if (userResult.restTime === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии.`;
  }

  const [position, total, percent] = getResults(allUserResults, userResult.points);

  return `Вы заняли ${position}-ое место из ${total}. Это лучше чем у ${percent}% игроков.`;
};
