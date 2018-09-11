
import AbstractView from "../abstract-view";

/**
 * Шаблон вариантов ответов по артистам
 */
export default class ArtistAnswerView extends AbstractView {
  /** @constructor
   * @param {Array} melodies - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(melodies, id, inputName) {
    super();
    this.id = id;
    this.inputName = inputName;
    this.melody = melodies[id];
  }

  get template() {
    return `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="${this.inputName}" value="${this.id}" id="answer-${this.id}">
      <label class="artist__name" for="answer-${this.id}">
        <img class="artist__picture" src="${this.melody.image}" alt="${this.melody.artist}">
        ${this.melody.artist}
      </label>
     </div>`;
  }
}
