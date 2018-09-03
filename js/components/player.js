import {createElementFromString} from '../utils';

/**
 * Шаблон музыкального плеера
 * @param {Object} melody - мелодия для воспроизведения
 * @param {string} attrs - дополнительные атрибуты аудио, например autoplay
 * @return {Node}
 */
export default (melody, attrs) => {
  const player = `
  <div class="track">
    <button class="track__button track__button--play" type="button"></button>
    <div class="track__status">
      <audio src="${melody.src}" ${attrs}></audio>
    </div>
  </div>
`;

  const element = createElementFromString(player);
  const audio = element.querySelector(`audio`);
  const playerBtn = element.querySelector(`.track__button`);

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
  const togglePlayerBtnIfPlaying = () => {
    playerBtn.classList.toggle(`track__button--play`);
    playerBtn.classList.toggle(`track__button--pause`);
  };

  audio.addEventListener(`playing`, togglePlayerBtnIfPlaying);
  playerBtn.addEventListener(`click`, playerBtnHolder);

  return element;
};
