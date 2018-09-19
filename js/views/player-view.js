import audioCache from "../data/audio-cache";
import AbstractView from "./abstract-view";

/**
 * Шаблон музыкального плеера
 */
export default class PlayerView extends AbstractView {
  /** @constructor
   * @param {Object} melody - мелодия для воспроизведения
   * @param {boolean} isPlayMode - автоматический проигрыш мелодии при отрисовки
   */
  constructor(melody, isPlayMode = false) {
    super();
    this.melody = melody;
    this.isPlayMode = isPlayMode;
    this.audio = audioCache.getAudio(this.melody);
  }

  get template() {
    const element = `
      <div class="track__status">
        <button class="track__button track__button--play" type="button"></button>
        <audio>
        </audio>
      </div>
    `;

    return element;
  }

  stop() {
    this.audio.stop();
  }

  bind() {

    const playerBtn = this.element.querySelector(`.track__button`);

    /**
     * Меняет внешний вид кнопки на паузу, если музыка играет
     */
    const togglePlayerBtnOnPlaying = () => {
      playerBtn.classList.toggle(`track__button--play`);
      playerBtn.classList.toggle(`track__button--pause`);
    };

    if (this.isPlayMode) {
      this.audio.play();
      togglePlayerBtnOnPlaying();
    }

    /**
     * Обработчик нажатия кнопки воспроизведения/паузы
     * @param {Event} evt - событие клика по кнопке
     */
    const playerBtnHolder = (evt) => {
      evt.preventDefault();
      if (this.isPlayMode) {
        this.audio.pause();
        this.isPlayMode = false;
      } else {
        this.audio.play();
        this.isPlayMode = true;
      }
      togglePlayerBtnOnPlaying();
    };

    playerBtn.addEventListener(`click`, playerBtnHolder);
  }
}
