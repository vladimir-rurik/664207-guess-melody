import WelcomeScreen from './screens/screen-welcome';
import {showScreen} from './utils';
import {startNewGame} from "./game-process";

const welcome = new WelcomeScreen();

showScreen(welcome.element);

welcome.onStartClick = () => {
  startNewGame();
};
