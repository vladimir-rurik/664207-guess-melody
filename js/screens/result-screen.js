import AbstractView from "../abstract-view";
import Application from "../application";

/**
 * Шаблон экрана результата игры
 */
export default class ResultScreen extends AbstractView {
  /** @constructor
   * @param {Object} stats - Результат игрока
   */
  constructor(stats) {
    super();
    this.stats = stats;
  }

  get template() {
    return `
    <section class="main result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">${this.stats.title}</h2>
      <p class="result__total">${this.stats.message}</p>
      <p class="result__text">${this.stats.comparison}</p>
      <button class="result__replay" type="button">${this.stats.button}</button>
    </section>`;
  }

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Application.showGame();
    });
  }
}
