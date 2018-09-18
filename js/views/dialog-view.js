import AbstractView from "./abstract-view";
import Application from "../application";

/**
 * Шаблон экрана подтверждения
 */
export default class DialogView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal">
      <button class="modal__close" type="button"><span class="visually-hidden">Закрыть</span></button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__buttons">
        <button class="modal__button button button--ok">Ок</button>
        <button class="modal__button button button--cancel">Отмена</button>
      </div>
    </section>
    `;
  }

  bind() {
    const okBtn = this.element.querySelector(`.button--ok`);
    okBtn.addEventListener(`click`, () => Application.start());

    const closeBtn = this.element.querySelector(`.modal__close`);
    closeBtn.addEventListener(`click`, () => this.element.parentNode.removeChild(this.element));

    const cancelBtn = this.element.querySelector(`.button--cancel`);
    cancelBtn.addEventListener(`click`, () => this.element.parentNode.removeChild(this.element));
  }
}
