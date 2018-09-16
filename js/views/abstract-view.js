/**
 * Создание нового DOM-элемента из шаблонной строки
 * @param {string} stringHTML - строка с HTML содержимым
 * @return {Node}
 */
const createElementFromString = (stringHTML) => {
  const template = document.createElement(`template`);
  template.innerHTML = stringHTML.trim();
  return template.content.firstChild;
};

/**
 * Абстрактный класс для создания слоя представления
 */
export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`An abstract view cannot be initialized`);
    }
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
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
}
