
import AbstractView from "./abstract-view";
import PlayerView from './player-view';

/**
 * Шаблон вариантов мелодий по жанру
 */
export default class GenreAnswerView extends AbstractView {
  /** @constructor
   * @param {Array} melody - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(melody, id, inputName) {
    super();
    this.id = id;
    this.inputName = inputName;
    this.player = new PlayerView(melody.src).element;
  }

  get template() {
    return `
    <div class="track">
      <div class="game__answer">
        <input class="game__input visually-hidden" type="checkbox" name="${this.inputName}" value="${this.id}" id="answer-${this.id}">
        <label class="game__check" for="answer-${this.id}">Отметить</label>
      </div>
    </div>
    `;
  }

  bind() {
    this.element.insertAdjacentElement(`afterbegin`, this.player);
  }
}
