import WelcomeView from './views/welcome-view';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import ResultView from './views/result-view';
import ErrorView from "./views/error-view";
import Loader from "./loader";
import LoadingView from "./views/loading-view";

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
    const welcome = new WelcomeView();
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
        this._showScreen(new ResultView(newStats).element);
      } catch (e) {
        Application.showError(e);
      }

    } else {
      this._showScreen(new ResultView(stats).element);
    }
  }

  static showLoading() {
    this._showScreen(new LoadingView().element);
  }

  static showError(message) {
    this._showScreen(new ErrorView(message).element);
  }
}
