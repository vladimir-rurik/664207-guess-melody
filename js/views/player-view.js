
import audioCache from "../data/audio-cache";
import AbstractView from "./abstract-view";

/**
 * Шаблон музыкального плеера
 */
export default class PlayerView extends AbstractView {
  /** @constructor
   * @param {Object} melody - мелодия для воспроизведения
   * @param {string} [attrs] - дополнительные атрибуты аудио, например autoplay
   */
  constructor(melody, attrs = ``) {
    super();
    this.melody = melody;
    this.attrs = attrs;
  }

  get template() {
    const element = `
      <div class="track__status">
        <button class="track__button track__button--play" type="button"></button>
        <audio ${this.attrs} preload="none">
          <source src="${this.melody}" type="audio/mpeg">
        </audio>
      </div>
    `;

    return element;
  }

  bind() {
    audioCache.activeAudio = this.melody;

    const audio = this.element.querySelector(`audio`);
    const playerBtn = this.element.querySelector(`.track__button`);

    /**
     * Обработчик нажатия кнопки воспроизведения/паузы
     * @param {Event} evt - событие клика по кнопке
     */
    const playerBtnHolder = (evt) => {
      evt.preventDefault();
      if (audio.paused) {
        audio.play().catch(() => {});
        audioCache.play();
      } else {
        audio.pause();
        audioCache.pause();
      }
      const btn = evt.target;
      if (btn.classList.contains(`track__button--pause`)) {
        btn.classList.remove(`track__button--pause`);
        btn.classList.add(`track__button--play`);
      }
    };

    /**
     * Меняет внешний вид кнопки на паузу, если музыка играет
     */
    const togglePlayerBtnOnPlaying = () => {
      playerBtn.classList.toggle(`track__button--play`);
      playerBtn.classList.toggle(`track__button--pause`);
    };

    const togglePlayerBtnOnEnded = () => {
      playerBtn.classList.remove(`track__button--pause`);
      playerBtn.classList.add(`track__button--play`);
    };

    audio.addEventListener(`playing`, togglePlayerBtnOnPlaying);
    audio.addEventListener(`ended`, togglePlayerBtnOnEnded);
    playerBtn.addEventListener(`click`, playerBtnHolder);
  }
}
