
import AbstractView from "../abstract-view";

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
    return `
    <div class="track">
      <button class="track__button track__button--play" type="button"></button>
      <div class="track__status">
        <audio src="${this.melody.src}" ${this.attrs}></audio>
      </div>
    </div>
    `;
  }

  bind() {
    const audio = this.element.querySelector(`audio`);
    const playerBtn = this.element.querySelector(`.track__button`);

    /**
     * Обработчик нажатия кнопки воспроизведения/паузы
     * @param {Event} evt - событие клика по кнопке
     */
    const playerBtnHolder = (evt) => {
      evt.preventDefault();
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
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
