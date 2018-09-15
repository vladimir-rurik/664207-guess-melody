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

const adaptData = (data) => {
  return data.map((question) => {
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
    }
    return adapted;
  });
};

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkResponseStatus(response);
    const responseData = await response.json();
    return adaptData(responseData);
  }

  static async loadStats() {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}`);
    checkResponseStatus(response);
    return await response.json();
  }

  static async saveStats(data) {
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}`, settings);
    return checkResponseStatus(response);
  }
}
