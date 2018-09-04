import {gameState, questions} from "../data/data";
import {createElementFromString, showScreen} from '../utils';
import {printResults} from '../data/results';
import level from "./screen-level";

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 * @param {Object} screenType - Тип экрана в случае победы или проигрыша
 * @param {Array} stats - Статистика результатов набранных баллов
 * @param {Object} result - Результат игрока
 * @return {Node}
 */
export default (screenType, stats, result) => {
  const stat = printResults(stats, result);
  const resultScreen = `
  <section class="main result">
    <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
    <h2 class="result__title">${screenType.title[Math.floor(Math.random() * screenType.title.length)]}</h2>
    <p class="result__total">${stat.result}</p>
    <p class="result__text">${stat.comparison}</p>
    <button class="result__replay" type="button">${screenType.button}</button>
  </section>
  `;

  const element = createElementFromString(resultScreen);

  element.querySelector(`.result__replay`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    // Пока что сброс стейта делается так
    gameState.question = 0;
    gameState.answers = [];
    gameState.user = {
      points: 0,
      fastPoints: 0,
      restAttempts: 3,
      restTime: 300
    };
    showScreen(level(questions[gameState.question]));
  });

  return element;
};
