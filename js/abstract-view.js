import {createElementFromString} from "./utils";

/**
 * Абстрактный класс для создания слоя представления
 */
export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`An abstract view cannot be initialized`);
    }
  }

  get template() {
    return ``;
  }

  render() {
    return createElementFromString(this.template);
  }

  bind() {
    // bind listeners if required
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }
}
