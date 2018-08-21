import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderScreen from '../utils/renderScreen';
import welcome from './welcome';
import genreScreen from './genreScreen';

const template = `
<section class="result">
  <div class="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"></div>
  <h2 class="result__title">Какая жалость!</h2>
  <p class="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
  <button class="result__replay" type="button">Попробовать ещё раз</button>
</section>
`;
const screen = getElementFromTemplate(template);
const welcomeBackBtn = screen.querySelector(`.result__logo`);
const replayBtn = screen.querySelector(`.result__replay`);

welcomeBackBtn.addEventListener(`click`, () => renderScreen(welcome));
replayBtn.addEventListener(`click`, () => renderScreen(genreScreen));

export default screen;
