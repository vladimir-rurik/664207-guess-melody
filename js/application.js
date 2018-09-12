import WelcomeScreen from './screens/welcome-screen';
import GameModel from './data/game-model';
import GameScreen from './screens/game-screen';
import ResultScreen from './screens/result-screen';
import LoadingScreen from "./screens/loading-screen";
import ErrorScreen from "./screens/error-screen";

/**
 * Рендер экран приложения
 * @param {Node} element - Элемент экрана
 */
const showScreen = (element) => {
  const mainScreen = document.querySelector(`.main`);
  mainScreen.parentNode.replaceChild(element, mainScreen);
};

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  } else if (response.status === 404) {
    throw new Error(`Данные не удалось загрузить,<br> ошибка ${response.status}`);
  } else {
    throw new Error(`Произошла ошибка ${response.status} ${response.statusText}`);
  }
};

const adaptData = (data) => {
  return data.map((question) => {
    let adapted;
    if (question.type === `artist`) {
      const options = question.answers.map((it) => {
        return {
          artist: it.title,
          image: it.image
        };
      });
      adapted = {
        type: question.type,
        title: question.question,
        options,
        melody: question.src,
        answer: question.answers.findIndex((a) => a.isCorrect)
      };
    } else if (question.type === `genre`) {
      const options = question.answers.map((a, i) => {
        return Object.assign({}, a, {id: i});
      });
      adapted = {
        type: question.type,
        title: question.question,
        options,
        answer: question.genre
      };
    }
    return adapted;
  });
};

let questions = [];

/** Класс для управления экранами игры */
export default class Application {
  static start() {
    const loader = new LoadingScreen().element;
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
        .then(checkResponseStatus)
        .then(showScreen(loader))
        .then((response) => response.json())
        .then((data) => adaptData(data))
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

  static showStats(screenType, stats) {
    const resultScreen = new ResultScreen(screenType, stats);
    showScreen(resultScreen.element);
  }

  static showError(message) {
    showScreen(new ErrorScreen(message).element);
  }
}
