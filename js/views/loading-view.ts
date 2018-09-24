
import AbstractView from "./abstract-view";

/**
 * Шаблон экрана загрузки
 */
export default class LoadingView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <section class="main">
    <div class="spinner"></div>
  </section>`;
  }
}
