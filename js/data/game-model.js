import {calcScoring} from "./scoring";
import {printResults} from "./results";

const INITIAL_STATE = Object.freeze({
  question: 0,
  answers: [],
  points: 0,
  restAttempts: 3,
  restTime: 300
});
const statistics = [1, 4, 5, 8];

export default class GameModel {
  constructor(questions) {
    this.restart();
    this.statistics = statistics;
    this.questions = questions;
  }

  get state() {
    return this._state;
  }

  updateStateProp(prop) {
    if (this._state.hasOwnProperty(Object.keys(prop))) {
      this._state = Object.assign({}, this._state, prop);
    } else {
      throw new Error(`Set only game state property`);
    }
  }

  setGameState(verdict, time) {
    this._answers.push({success: verdict, time});
    this.updateStateProp({answers: this._answers});

    if (!verdict && this._state.restAttempts >= 0) {
      this.updateStateProp({restAttempts: this._state.restAttempts - 1});
    }
    const points = calcScoring(this._answers, this._state.restAttempts);
    this.updateStateProp({points});
  }

  hasNextQuestion() {
    return this._state.points !== null && this._state.question < this.questions.length - 1;
  }

  getCurrentQuestion() {
    return this.questions[this._state.question];
  }

  getNextQuestion() {
    this.updateStateProp({question: this._state.question + 1});
    return this.getCurrentQuestion();
  }

  getStats() {
    return printResults(this.statistics, this._state);
  }

  restart() {
    this._answers = [];
    this._state = INITIAL_STATE;
    this.updateStateProp({answers: this._answers});
  }

  updateStats() {
    if (this._state.points !== null) {
      this.statistics.push(this._state.points);
    }
  }

  setRestTime(restTime) {
    this.updateStateProp({restTime});
  }
}
