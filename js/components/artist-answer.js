
import {createElementFromString} from '../utils';
import {INPUT_NAME, melodies} from "../data/data";

/**
 * Шаблон вариантов ответов по артистам
 * @param {number} id - Номер мелодии из списка вопросов
 * @return {Node}
 */
export default (id) => {
  const melody = melodies[id];
  const artistAnswer = `
  <div class="artist">
    <input class="artist__input visually-hidden" type="radio" name="${INPUT_NAME}"" value="${id}" id="answer-${id}">
    <label class="artist__name" for="answer-${id}">
      <img class="artist__picture" src="${melody.image}"" alt="${melody.artist}">
      ${melody.artist}
    </label>
  </div>`;

  return createElementFromString(artistAnswer);
};
