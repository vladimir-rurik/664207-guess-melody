
import AbstractView from "../abstract-view";
import Player from './player';

/**
 * Шаблон вариантов мелодий по жанру
 */
export default class GenreAnswer extends AbstractView {
  /** @constructor
   * @param {Array} melodies - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(melodies, id, inputName) {
    super();
    this.id = id;
    this.inputName = inputName;
    this.player = new Player(melodies[id]).element;
  }

  get template() {
    return `
    <div class="game__answer">
      <input class="game__input visually-hidden" type="checkbox" name="${this.inputName}" value="${this.id}" id="answer-${this.id}">
      <label class="game__check" for="answer-${this.id}">Отметить</label>
    </div>`;
  }

  bind() {
    this.element.insertAdjacentElement(`afterbegin`, this.player);
  }
}
