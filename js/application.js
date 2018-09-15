import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import ResultScreen from './screens/result-screen';
import ErrorScreen from "./screens/error-screen";
import Loader from "./loader";
import LoadingScreen from "./screens/loading-screen";

<<<<<<< HEAD
/**
 * Рендер экран приложения
 * @param {Node} element - Элемент экрана
 */
export const showScreen = (element) => {
  const mainScreen = document.querySelector(`.app .main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

=======
>>>>>>> 0a5276547c99035ac1980ca20e40544ce105e09b
let questions = [];

/** Класс для управления экранами игры */
export default class Application {
  static async start() {
    try {
      Application.showLoading();
      Application.showWelcome(await Loader.loadData());
    } catch (e) {
      Application.showError(e);
    }
  }

  /**
   * Рендер экран приложения
   * @param {Node} element - Элемент экрана
   */
  static _showScreen(element) {
    const mainScreen = document.querySelector(`.app .main`);
    mainScreen.parentNode.replaceChild(element, mainScreen);
  }

  static showWelcome(data) {
    questions = data;
    const welcome = new WelcomeScreen();
    this._showScreen(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(questions));
    this._showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static async showStats(state) {
    Application.showLoading();
    const stats = GameModel.getStats(state);
    if (stats.isWin) {
      const result = {
        points: stats.points,
        time: stats.time
      };

      try {
        await Loader.saveStats(result);
        const data = await Loader.loadStats();
        const newStats = GameModel.getStats(state, data);
        this._showScreen(new ResultScreen(newStats).element);
      } catch (e) {
        Application.showError(e);
      }

    } else {
      this._showScreen(new ResultScreen(stats).element);
    }
  }

  static showLoading() {
    this._showScreen(new LoadingScreen().element);
  }

  static showError(message) {
    this._showScreen(new ErrorScreen(message).element);
  }
}
