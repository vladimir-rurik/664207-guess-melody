import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import ResultScreen from './screens/result-screen';

/**
 * Рендер экран приложения
 * @param {Node} element - Элемент экрана
 */
const showScreen = (element) => {
  const mainScreen = document.querySelector(`.main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

/** Класс для управления экранами игры */
export default class Application {
  static showWelcome() {
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel());
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(screenType, stats) {
    const resultScreen = new ResultScreen(screenType, stats);
    showScreen(resultScreen.element);
  }
}
