import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderScreen from '../utils/renderScreen';
import welcome from './welcome';
import genreScreen from './genreScreen';

const template = `
<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Вы настоящий меломан!</h2>
  <p class="result__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
  <p class="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
  <button class="result__replay" type="button">Сыграть ещё раз</button>
</section>
`;
const screen = getElementFromTemplate(template);
const welcomeBackBtn = screen.querySelector(`.result__logo`);
const replayBtn = screen.querySelector(`.result__replay`);

welcomeBackBtn.addEventListener(`click`, () => renderScreen(welcome));
replayBtn.addEventListener(`click`, () => renderScreen(genreScreen));

export default screen;
