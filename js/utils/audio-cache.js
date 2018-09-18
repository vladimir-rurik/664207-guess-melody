export default class AudioCache {
  constructor() {
    this.audios = [];
    this._activeAudio = null;
  }

  get activeAudio() {
    return this._activeAudio;
  }

  set activeAudio(src) {
    if (this._activeAudio) {
      this.stop();
    }

    this._activeAudio = this.getAudio(src);
  }

  getAudio(src) {
    const audio = this.audios.find((it) => it.src === src);

    return audio ? audio : null;
  }

  createAudio(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.src = src;
      audio.oncanplaythrough = (evt) => {
        const path = evt.path || (evt.composedPath && evt.composedPath());

        return resolve(path[0]);
      };
      audio.onerror = () => reject();

      this.audios.push(audio);
    });
  }

  removeActive() {
    this._activeAudio = null;
  }

  clear() {
    this.audios = [];
    this.removeActive();
  }

  play() {
    if (this._activeAudio) {
      this._activeAudio.play();
    }
  }

  pause() {
    if (this._activeAudio) {
      this._activeAudio.pause();
    }
  }

  stop() {
    if (this._activeAudio) {
      this._activeAudio.pause();
      this._activeAudio.currentTime = 0;
    }
  }
}
