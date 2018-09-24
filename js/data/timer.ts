/*
 * Создание объекта таймера
 * @param {number} timeInSeconds - Время работы таймера в секундах
 * @return {Object} - Объект таймера
 */
export default class Timer {
  constructor(timeInSeconds, onTick, onEnd) {
    this._startTime = timeInSeconds;
    this.time = this._startTime;
    if (onTick && typeof onTick === `function`) {
      this.onTick = onTick;
    }
    if (onEnd && typeof onEnd === `function`) {
      this.onEnd = onEnd;
    }
  }

  get currentTime() {
    return this.time;
  }

  start() {
    clearInterval(this.interval);
    this.time = this._startTime;
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  stopOnEnd() {
    this.stop();
    if (this.onEnd) {
      this.onEnd();
    }
  }

  tick() {
    --this.time;
    if (this.onTick) {
      this.onTick(this.time);
    }
    return this.time > 0 ? this.time : this.stopOnEnd();
  }
}
