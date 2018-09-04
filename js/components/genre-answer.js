import {createElementFromString} from '../utils';
import {INPUT_NAME, melodies} from "../data/data";
import player from './player';

/**
 * Шаблон вариантов мелодий по жанру
 * @param {number} id - Номер мелодии из списка вопросов
 * @return {Node}
 */
export default (id) => {
  const genreAnswer = `
  <div class="game__answer">
    <input class="game__input visually-hidden" type="checkbox" name="${INPUT_NAME}" value="${id}" id="answer-${id}">
    <label class="game__check" for="answer-${id}">Отметить</label>
  </div>`;

  const genreElement = createElementFromString(genreAnswer);
  const element = player(melodies[id]);

  element.insertBefore(genreElement, element.firstChild);

  return element;
};
