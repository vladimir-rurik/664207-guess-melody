import StateView from '../views/state-view';
import LevelView from '../views/level-view';
import Application from '../application';
import Timer from '../data/timer';
import {QuestionType} from "../loader";

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.time = this.model.state.restTime;
    this.timer = new Timer(this.time,
        this.onTimerTick.bind(this),
        this.onTimerEnd.bind(this));
    this._startTime = this.timer.currentTime;

    this.levelState = new StateView(this.model.state);
    this.levelView = new LevelView(this.model.getCurrentQuestion(), this.model.getProgress());

    this.root = document.createElement(`section`);
    this.root.classList.add(`main`, `game`);
    this.root.appendChild(this.levelState.element);
    this.root.appendChild(this.levelView.element);

    this.levelView.onLevelLoaded = () => {
      this._startTime = this.timer.currentTime;
    };
  }

  get element() {
    return this.root;
  }

  startGame() {
    this.showFirstQuestion();
    this.timer.start();
  }

  onTimerTick(time) {
    this.model.setRestTime(time);
    this.levelState.onTimerRefresh(this.model.state);
  }

  onTimerEnd() {
    this.showResultView();
  }

  setStartTimeForAnswer() {
    this._startTime = this.timer.currentTime;
  }

  processUserAnswer(question, answer) {
    let verdict = false;
    if (question.type === QuestionType.ARTIST) {
      verdict = answer === question.answer;
    } else if (question.type === QuestionType.GENRE) {
      const rightAnswers = Array.from(question.options).filter((option) => {
        return option.genre === question.answer;
      }).map((rightAnswer) => rightAnswer.id);
      verdict = rightAnswers.join() === answer.join();
    }

    const timeForAnswer = this._startTime - this.timer.currentTime;
    this.model.setGameState(verdict, timeForAnswer);

    if (this.model.hasNextQuestion()) {
      this.showNextQuestion();
    } else {
      this.showResultView();
    }
  }

  updateStateView() {
    const stateView = new StateView(this.model.state);
    this.root.replaceChild(stateView.element, this.levelState.element);
    this.levelState = stateView;
  }

  updateLevelView(view) {
    this.root.replaceChild(view.element, this.levelView.element);
    this.levelView = view;
  }

  showFirstQuestion() {
    this.levelView.onLevelLoaded = this.setStartTimeForAnswer.bind(this);
    this.levelView.onAnswer = this.processUserAnswer.bind(this);
  }

  showNextQuestion() {
    this.updateStateView();
    const nextQuestion = new LevelView(this.model.getNextQuestion(), this.model.getProgress());
    nextQuestion.onLevelLoaded = this.setStartTimeForAnswer.bind(this);
    nextQuestion.onAnswer = this.processUserAnswer.bind(this);
    this.updateLevelView(nextQuestion);
  }

  showResultView() {
    this.timer.stop();
    Application.showStats(this.model.state);
  }
}
