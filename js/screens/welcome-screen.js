import AbstractView from "../abstract-view";
import Application from "../application";

const GAME_RULES = [`За 5 минут нужно ответить на все вопросы.`, `Можно допустить 3 ошибки.`];

/**
 * Шаблон экрана приветствия
 */
export default class WelcomeScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="main">
      <div class="welcome">
        <div class="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
        <button class="welcome__button"><span class="visually-hidden">Начать игру</span></button>
        <h2 class="welcome__rules-title">Правила игры</h2>
        <p class="welcome__text">Правила просты:</p>
        <ul class="welcome__rules-list">
          ${this.getRulesTemplate}
        </ul>
        <p class="welcome__text">Удачи!</p>
      </div>
    </section>
    `;
  }

  onStartClick() {}

  bind() {
    this.element.querySelector(`.welcome__button`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Application.showGame();
    });
  }

  static get getRulesTemplate() {
    return GAME_RULES.map((it) => `<li>${it}</li>`).join(``);
  }
}
