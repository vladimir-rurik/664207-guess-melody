/*
 * Создание объекта таймера
 * @param {number} timeInSeconds - Время работы таймера в секундах
 * @return {Object} - Объект таймера
 */
export default class Timer {
  constructor(timeInSeconds, onTick, onEnd) {
    this._startTime = timeInSeconds;
    this.time = this._startTime;
    if (onEnd && typeof onEnd === `function`) {
      this.onTick = onTick;
    }
    if (onEnd && typeof onEnd === `function`) {
      this.onEnd = onEnd;
    }
  }

  start() {
    clearInterval(this.interval);
    this.time = this._startTime;
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stop() {
    clearInterval(this.interval);
    if (this.onEnd) {
      this.onEnd();
    }
    return null;
  }

  tick() {
    if (this.onTick) {
      this.onTick(this.time);
    }
    this.time--;
    return this.time >= 0 ? this.time : this.stop();
  }
}
