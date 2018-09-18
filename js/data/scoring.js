// Максимальное число попыток
export const MAX_NUM_OF_ATTEMPTS = 3;
// Максимальное время на быстрый ответ
const MAX_FAST_ANSWER_TIME = 30;

const ONE_SCORE = 1;
const TWO_SCORES = 2;

/*
 * Подсчёт набранных баллов игрока
 * @param {Array} answers - Массив ответов пользователя
 * @param {number} restAttempts - Количество оставшихся нот
 * @return {number} - Количество набранных очков
 */
export const calcScoring = (answers, restAttempts) => {
  const falseAnswers = answers.filter((a) => !a.success).length;

  if (falseAnswers !== MAX_NUM_OF_ATTEMPTS - restAttempts) {
    throw new Error(`Wrong answers (${falseAnswers}) don't match the rest of the notes
    (${MAX_NUM_OF_ATTEMPTS - restAttempts})`);
  }

  const isAttemptsOver = restAttempts === 0 || falseAnswers === MAX_NUM_OF_ATTEMPTS;

  if (isAttemptsOver) {
    return null;
  }

  return answers.reduce((acc, current) => {
    if (current.success) {
      return current.time < MAX_FAST_ANSWER_TIME ? acc + TWO_SCORES : acc + ONE_SCORE;
    }
    return acc - TWO_SCORES;
  }, 0);
};
