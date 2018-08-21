const app = document.querySelector(`main.app`);
let currentScreen = app.querySelector(`.main`);

/**
 * Render an application screen
 * @param {Node} newScreen - DOM-element of a screen
 */
const renderScreen = (newScreen) => {
  if (currentScreen === newScreen) {
    return;
  }

  app.replaceChild(newScreen, currentScreen);
  currentScreen = newScreen;
};

export default renderScreen;
