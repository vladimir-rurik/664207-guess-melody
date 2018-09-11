import {INITIAL_STATE, melodies, questions, statistics} from "../data/data";
import {calcScoring} from "./scoring";
import {printResults} from "./results";

export default class GameModel {
  constructor() {
    this.restart();
    this.statistics = statistics;
    this.melodies = melodies;
    this.questions = questions;
  }

  get state() {
    return this._state;
  }

  getQuestion(state) {
    return this.questions[state.question];
  }

  get rightGenreAnswers() {
    const question = this.getQuestion(this._state);
    return Array.from(question.options).filter((i) => this.melodies[i].genre === question.answer);
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
    return this.getQuestion(this._state);
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
