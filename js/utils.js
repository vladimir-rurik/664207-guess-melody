/**
 * Создание нового DOM-элемента из шаблонной строки
 * @param {string} stringHTML - строка с HTML содержимым
 * @return {Node}
 */
export const createElementFromString = (stringHTML) => {
  const template = document.createElement(`template`);
  template.innerHTML = stringHTML.trim();
  return template.content.firstChild;
};

/**
 * Рендер экран приложения
 * @param {Node} element - Элемент экрана
 */
export const showScreen = (element) => {
  const mainScreen = document.querySelector(`.main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};
