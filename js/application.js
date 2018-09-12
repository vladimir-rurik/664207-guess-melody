import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import ResultScreen from './screens/result-screen';
import ErrorScreen from "./screens/error-screen";
import Loader from "./loader";
import LoadingScreen from "./screens/loading-screen";

/**
 * Рендер экран приложения
 * @param {Node} element - Элемент экрана
 */
export const showScreen = (element) => {
  const mainScreen = document.querySelector(`.app .main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

let questions = [];

/** Класс для управления экранами игры */
export default class Application {
  static start() {
    Loader.loadData()
        .then(Application.showWelcome)
        .catch(Application.showError);
  }

  static showWelcome(data) {
    questions = data;
    const welcome = new WelcomeScreen();
    showScreen(welcome.element);
  }

  static showGame() {
    const gameScreen = new GameScreen(new GameModel(questions));
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(state) {
    const stats = GameModel.getStats(state);
    if (stats.isWin) {
      showScreen(new LoadingScreen().element);
      const result = {
        points: stats.points,
        time: stats.time
      };
      Loader.saveStats(result)
          .then(() => Loader.loadStats())
          .then((data) => GameModel.getStats(state, data))
          .then((newstats) => showScreen(new ResultScreen(newstats).element))
          .catch(Application.showError);
    } else {
      showScreen(new ResultScreen(stats).element);
    }
  }

  static showError(message) {
    showScreen(new ErrorScreen(message).element);
  }
}
