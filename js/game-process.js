import {gameState, result, questions, statistics, melodies} from "./data/data";
import {showScreen} from './utils';
import {calcScoring} from './data/scoring';
import resultScreen from './screens/screen-result';
import level from "./screens/screen-level";

/**
 * Обработка ответов пользователя
 * @param {Object} question - Текущий вопрос
 * @param {number|Array} answer - Ответ пользователя в виде числа или массива
 */
export const processUserAnswer = (question, answer) => {
  let verdict = false;
  if (question.type === `artist`) {
    verdict = answer === question.answer;
  } else {
    const rightAnswers = Array.from(question.variants).filter((i) => melodies[i].genre === question.answer);
    verdict = rightAnswers.every((a, i) => a === answer[i]);
  }
  // Временно поставим рандомное время для теста
  gameState.answers.push({success: verdict, time: Math.floor(Math.random() * 60)});

  if (!verdict && gameState.user.restAttempts >= 0) {
    gameState.user.restAttempts--;
  }
  gameState.user.points = calcScoring(gameState.answers, gameState.user.restAttempts);

  if (gameState.user.points === null) {
    showScreen(resultScreen(result.LOSE, statistics, gameState.user));
  } else if (gameState.question < questions.length - 1) {
    const currentQuestion = questions[++gameState.question];
    showScreen(level(currentQuestion));
  } else {
    showScreen(resultScreen(result.WIN, statistics, gameState.user));
  }
};
