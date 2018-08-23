// Максимальное число попыток
const MAX_NUM_OF_ATTEMPTS = 3;
// Количество вопросов
const NUM_OF_QUESTIONS = 10;
// Максимальное время на быстрый ответ
const MAX_FAST_ANSWER_TIME = 30;

/*
 * Подсчёт набранных баллов игрока
 * @param {Array} answers - Массив ответов пользователя
 * @param {number} restNotes - Количество оставшихся нот
 * @return {number} - Количество набранных очков
 */
export const calcScoring = (answers, restNotes) => {
  const falseAnswers = answers.filter((a) => !a.success).length;
  if (falseAnswers !== MAX_NUM_OF_ATTEMPTS - restNotes) {
    throw new Error(`Wrong answers don't match the rest of the notes`);
  }

  if (restNotes === 0 || answers.length < NUM_OF_QUESTIONS) {
    return -1;
  }

  return answers.reduce((acc, current) => {
    if (current.success) {
      return current.time < MAX_FAST_ANSWER_TIME ? acc + 2 : acc + 1;
    }
    return acc - 2;
  }, 0);
};
