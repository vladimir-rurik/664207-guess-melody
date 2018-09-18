import AbstractView from "./abstract-view";

/**
 * Шаблон экрана ошибки
 */
export default class ErrorView extends AbstractView {
  constructor(message) {
    super();
    this.message = message;
  }

  get template() {
    return `
      <section class="modal">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text">${this.message}</p>
      </section>
    `;
  }
}
