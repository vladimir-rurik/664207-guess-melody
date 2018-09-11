import AbstractView from "../abstract-view";
import PlayerView from './player';
import ArtistAnswerView from './artist-answer';
import GenreAnswerView from './genre-answer';
import {header} from '../screens/header';
// import {showScreen} from './utils';
// import WelcomeScreen from '../screens/screen-welcome';

/** @enum Genres - Ассоциация жанра с его описанием */
const Genres = {
  'Rock': `инди-рок`,
  'Jazz': `джаз`,
  'Country': `кантри`,
  'Pop': `поп-музыка`,
  'Folk': `фолк`,
  'R&B': `R&B`,
  'Electronic': `электронная музыка`
};
/** @const INPUT_NAME - Имя поля для идентификации */
const INPUT_NAME = `answer`;

/**
 * Шаблон экрана уровня игры с текущим вопросом и состоянием игры
 * Имеет два режима в зависимости от типа вопроса:
 * 1. выбор артиста по заданной мелодии
 * 2. выбор всех мелодий определённого жанра
 */
export default class LevelScreen extends AbstractView {
  /** @constructor
   * @param {Object} melodies - Список мелодий с сервера
   * @param {Object} question - Текущий вопрос
   */
  constructor(melodies, question) {
    super();
    this.melodies = melodies;
    this.question = question;
    this.nowPlaying = null;
  }

  get template() {
    let title = `<h2 class="game__title">Кто исполняет эту песню?</h2>`;
    let formClass = `game__artist`;
    let btn = ``;

    if (this.question.type === `genre`) {
      title = `<h2 class="game__title" align="center">Выберите все треки<br> в жанре ${Genres[this.question.answer]}</h2>`;
      formClass = `game__tracks`;
      btn = `<button class="game__submit button" type="submit" disabled>Ответить</button>`;
    }

    return `
    <section class="game">
      <section class="main game__screen">
        ${header}
        <!--levelState-->
        <div class="main__wrap">
          ${title}
          <!--PlayerView-->
          <form class="${formClass}">
            <!--Answers-->
            ${btn}
          </form>
        </div>
      </section>
    </section>
    `;
  }

  onAnswer() {}

  onLevelLoaded() {}

  togglePlayers(evt) {
    if (this.nowPlaying && this.nowPlaying !== evt.target) {
      this.nowPlaying.pause();
      this.nowPlaying.currentTime = 0;

      const btnPlaying = this.nowPlaying.nextSibling.parentElement.parentElement.querySelector(`.track__button`);
      if (btnPlaying.classList.contains(`track__button--pause`)) {
        btnPlaying.classList.remove(`track__button--pause`);
        btnPlaying.classList.add(`track__button--play`);
      }
    }
    this.nowPlaying = evt.target;
  }


  bind() {
    const form = this.element.querySelector(`form`);

    // // TODO back to main screen option
    // const welcomeBackBtn = this.element.querySelector(`.game__back`);
    // welcomeBackBtn.addEventListener(`click`, () => showScreen(WelcomeScreen));

    const options = Array.from(this.question.options);
    const answerList = document.createDocumentFragment();
    for (const id of options) {
      answerList.appendChild(this.question.type === `artist`
        ? new ArtistAnswerView(this.melodies, id, INPUT_NAME).element
        : new GenreAnswerView(this.melodies, id, INPUT_NAME).element);
    }

    form.insertBefore(answerList, form.firstChild);

    const inputs = Array.from(form[INPUT_NAME]);

    if (this.question.type === `artist`) {
      const player = new PlayerView(this.melodies[this.question.answer], `autoplay`).element;
      form.insertBefore(player, form.firstChild);

      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const answer = Number(evt.target.value);
        this.onAnswer(this.question, answer);
      }));

    } else {
      const firstPlayer = form.firstChild;
      firstPlayer.querySelector(`audio`).setAttribute(`autoplay`, ``);

      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        // Кнопка отправки отключена, пока не выбран хоть один ответ
        form.querySelector(`.game__submit`).disabled = !inputs.some((answer) => answer.checked);
      }));

      // логика переключения играющих мелодий, включается новая, отключается предыдущая
      form.addEventListener(`playing`, this.togglePlayers, true);

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const answer = inputs.filter((i) => i.checked).map((i) => Number(i.value));
        this.onAnswer(this.question, answer);
      });
    }

    this.onLevelLoaded();
  }
}
