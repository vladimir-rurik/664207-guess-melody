import AbstractView from "../abstract-view";

/**
 * Шаблон экрана результата игры
 */
export default class ResultScreen extends AbstractView {
  /** @constructor
   * @param {Object} screenType - Тип экрана в случае победы или проигрыша
   * @param {Object} stats - Результат игрока
   */
  constructor(screenType, stats) {
    super();
    this.screenType = screenType;
    this.stats = stats;
    this.title = this.screenType.titles[Math.floor(Math.random() * this.screenType.titles.length)];
  }

  get template() {
    return `
    <section class="main result">
      <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
      <h2 class="result__title">${this.title}</h2>
      <p class="result__total">${this.stats.message}</p>
      <p class="result__text">${this.stats.comparison}</p>
      <button class="result__replay" type="button">${this.screenType.button}</button>
    </section>`;
  }

  onRestartClick() {}

  bind() {
    this.element.querySelector(`.result__replay`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onRestartClick();
    });
  }
}
