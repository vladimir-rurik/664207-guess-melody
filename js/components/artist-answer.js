
import AbstractView from "../abstract-view";

/**
 * Шаблон вариантов ответов по артистам
 */
export default class ArtistAnswerView extends AbstractView {
  /** @constructor
   * @param {Array} melody - Массив мелодий из данных
   * @param {number} id - Номер мелодии из списка вопросов
   * @param {string} inputName - Имя элемента ввода
   */
  constructor(melody, id, inputName) {
    super();
    this.id = id;
    this.inputName = inputName;
    this.melody = melody;
    this.image = this.melody.image;
  }

  get template() {
    return `
    <div class="artist">
      <input class="artist__input visually-hidden" type="radio" name="${this.inputName}" value="${this.id}" id="answer-${this.id}">
      <label class="artist__name" for="answer-${this.id}">
        <img class="artist__picture" src="${this.image.url}" alt="${this.melody.artist}" width="${this.image.width}" height="${this.image.height}">
        ${this.melody.artist}
      </label>
     </div>`;
  }
}
