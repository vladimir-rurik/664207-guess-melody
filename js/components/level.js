import AbstractView from "../abstract-view";
import PlayerView from './player';
import ArtistAnswerView from './artist-answer';
import GenreAnswerView from './genre-answer';
import {QuestionType} from "../loader";

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
   * @param {Object} question - Текущий вопрос
   * @param {string} progress - Показатель прогресса
   */
  constructor(question, progress) {
    super();
    this.question = question;
    this.progress = progress;
    this._nowPlaying = null;
  }

  get template() {
    let titleClass = `game__title`;
    let formClass = `game__artist`;
    let btn = ``;

    if (this.question.type === QuestionType.GENRE) {
      titleClass = ``;
      formClass = `game__tracks`;
      btn = `<button class="game__submit button" type="submit" disabled>Ответить</button>`;
    }

    return `
      <section class="game__screen">
        <!--levelState-->
        <div class="progress">${this.progress}</div>
        <h2 class="title ${titleClass}">${this.question.title}</h2>
        <!--PlayerView-->
        <form class="${formClass}">
          <!--Answers-->
          ${btn}
        </form>
      </section>
    `;
  }

  onAnswer() {}

  onLevelLoaded() {}

  togglePlayers(evt) {
    if (this._nowPlaying && this._nowPlaying !== evt.target) {
      this._nowPlaying.pause();
      this._nowPlaying.currentTime = 0;

      const btnPlaying = this._nowPlaying.parentNode.querySelector(`.track__button`);
      if (btnPlaying.classList.contains(`track__button--pause`)) {
        btnPlaying.classList.remove(`track__button--pause`);
        btnPlaying.classList.add(`track__button--play`);
      }
    }
    this._nowPlaying = evt.target;
  }

  bind() {
    const form = this.element.querySelector(`form`);

    const options = Array.from(this.question.options);
    const answerList = document.createDocumentFragment();
    options.forEach((option, id) => {
      answerList.appendChild(this.question.type === QuestionType.ARTIST
        ? new ArtistAnswerView(option, id, INPUT_NAME).element
        : new GenreAnswerView(option, id, INPUT_NAME).element);
    });

    form.insertBefore(answerList, form.firstChild);

    const inputs = Array.from(form[INPUT_NAME]);

    if (this.question.type === QuestionType.ARTIST) {
      const player = new PlayerView(this.question.melody, `autoplay`).element;
      player.classList.add(`game__track`);
      player.classList.remove(`track__status`);
      form.parentElement.insertBefore(player, form.parentElement.lastElementChild);

      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        const answer = Number(evt.target.value);
        this.onAnswer(this.question, answer);
      }));

    } else if (this.question.type === QuestionType.GENRE) {
      const firstPlayer = form.firstChild;
      firstPlayer.querySelector(`audio`).setAttribute(`autoplay`, ``);

      const gameSubmitBtn = form.querySelector(`.game__submit`);
      inputs.forEach((input) => input.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        gameSubmitBtn.disabled = !inputs.some((answer) => answer.checked);
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
