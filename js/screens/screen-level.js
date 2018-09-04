// Временно разрешил использование console.log для подсказок ответов на вопросы
/* eslint-disable no-console */
import {INPUT_NAME, gameState, melodies, genres} from "../data/data";
import {createElementFromString} from '../utils';
import {processUserAnswer} from "../game-process";
import artistAnswer from '../components/artist-answer';
import genreAnswer from '../components/genre-answer';
import levelState from '../components/level-state';
import player from '../components/player';
import {header} from './header';
import welcome from './screen-welcome';
import {showScreen} from '../utils';
import {getRadius} from '../data/get-radius';

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 * @param {Object} question - Текущий вопрос
 * @return {Node}
 */
export default (question) => {
  const timerRelation = 20 / 300; // TODO make a timer's time variable instead of hardcoded 20
  const svgOptions = getRadius(timerRelation, 370);

  let title = `<h2 class="game__title">Кто исполняет эту песню?</h2>`;
  let formClass = `game__artist`;
  let btn = ``;
  let nowPlaying = null;

  if (question.type === `genre`) {
    title = `<h2 class="game__title" align="center">Выберите все треки<br> в жанре ${genres[question.answer]}</h2>`;
    formClass = `game__tracks`;
    btn = `<button class="game__submit button" type="submit" disabled>Ответить</button>`;
  }

  const level = `
  <section class="game">
    <section class="main game__screen">
      ${header}
      <!--levelState-->
      <div class="main__wrap">
        ${title}
        <!--Player-->
        <form class="${formClass}">
          <!--Answers-->
          ${btn}
        </form>
      </div>
    </section>
  </section>
  `;

  const element = createElementFromString(level);
  element.insertBefore(levelState(gameState, svgOptions), element.firstChild);
  const form = element.querySelector(`form`);
  const sendBtn = form.querySelector(`.game__submit`);

  // back to main screen option
  const welcomeBackBtn = element.querySelector(`.game__back`);
  welcomeBackBtn.addEventListener(`click`, () => showScreen(welcome));

  const answersList = document.createDocumentFragment();
  question.options.forEach((id) => {
    answersList.appendChild(question.type === `artist` ? artistAnswer(id) : genreAnswer(id));
  });
  form.appendChild(answersList);

  const togglePlayers = (evt) => {
    if (nowPlaying && nowPlaying !== evt.target) {
      nowPlaying.pause();
      nowPlaying.currentTime = 0;

      const btnPlaying = nowPlaying.nextSibling.parentElement.parentElement.querySelector(`.track__button`);
      if (btnPlaying.classList.contains(`track__button--pause`)) {
        btnPlaying.classList.remove(`track__button--pause`);
        btnPlaying.classList.add(`track__button--play`);
      }
    }
    nowPlaying = evt.target;
  };

  const inputs = Array.from(form[INPUT_NAME]);

  if (question.type === `artist`) {
    // Подсказка ;)
    console.log(`Правильный ответ: ${melodies[question.answer].artist}`);

    element.querySelector(`.main__wrap`).insertBefore(player(melodies[question.answer], `autoplay`), form);

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      const answer = Number(evt.target.value);
      processUserAnswer(question, answer);
    }));

  } else {
    // Подсказка ;)
    const rightAnswers = Array.from(question.options)
      .filter((i) => melodies[i].genre === question.answer)
      .map((i) => Array.from(question.options).indexOf(i) + 1).join(`, `);

    console.log(`Правильные ответы: ${rightAnswers}`);

    form.appendChild(sendBtn);

    inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      // Кнопка отправки отключена, пока не выбран хоть один ответ
      sendBtn.disabled = !inputs.some((answer) => answer.checked);
    }));

    form.addEventListener(`playing`, togglePlayers, true);

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const answer = inputs.filter((i) => i.checked).map((i) => Number(i.value));
      processUserAnswer(question, answer);
    });
  }

  return element;
};
