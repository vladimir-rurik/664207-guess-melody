/* eslint-disable no-console */
import LoadingScreen from "./screens/loading-screen";
import {showScreen} from "./application";

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 127367003;

export const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  } else if (response.status === 404) {
    throw new Error(`Данные не удалось загрузить,<br> ошибка ${response.status}`);
  } else {
    throw new Error(`Произошла ошибка ${response.status} ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();

const adaptData = (data) => {
  return data.map((question, iq) => {
    let adapted;
    if (question.type === QuestionType.ARTIST) {
      const options = question.answers.map((it) => {
        return {
          artist: it.title,
          image: it.image
        };
      });
      adapted = {
        type: question.type,
        title: question.question,
        options,
        melody: question.src,
        answer: question.answers.findIndex((a) => a.isCorrect)
      };
      // TODO: remove
      console.log(`${iq + 1}. Right answer - ${adapted.answer}`);

    } else if (question.type === QuestionType.GENRE) {
      const options = question.answers.map((a, i) => {
        return Object.assign({}, a, {id: i});
      });
      adapted = {
        type: question.type,
        title: question.question,
        options,
        answer: question.genre
      };
      // TODO: remove
      const rightAnswers = Array.from(adapted.options).filter((option) => {
        return option.genre === adapted.answer;
      }).map((rightAnswer) => rightAnswer.id);
      console.log(`${iq + 1}. Right answer - ${rightAnswers.join()}`);

    }
    return adapted;
  });
};

export default class Loader {
  static loadData() {
    const loader = new LoadingScreen().element;
    return fetch(`${SERVER_URL}/questions`)
        .then(checkResponseStatus)
        .then(showScreen(loader))
        .then(toJSON)
        .then(adaptData);
  }

  static loadStats() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}`)
        .then(checkResponseStatus)
        .then(toJSON);
  }

  static saveStats(data) {
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}`, settings).then(checkResponseStatus);
  }
}
