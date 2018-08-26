import {assert} from 'chai';
import {getResults, printResults} from './results';

describe(`Printing results`, () => {
  it(`should return right results on success`, () => {
    assert.deepEqual(getResults([1], 2), [1, 2, 50]);
    assert.deepEqual(getResults([20], 19), [2, 2, 0]);
    assert.deepEqual(getResults([4, 5, 8, 20], 15), [2, 5, 60]);
  });

  it(`should return right message on success`, () => {
    const userResult = {
      points: 9,
      restNotes: 2,
      restTime: 50
    };
    assert.equal(printResults([1, 2, 3, 4, 5, 6, 7, 8, 10], userResult), `Вы заняли 2-ое место из 10. Это лучше чем у 80% игроков.`);
  });

  it(`should return right message on lose`, () => {
    assert.equal(printResults([4, 5, 8, 20], {
      points: 10,
      restNotes: 2,
      restTime: 0
    }), `Время вышло! Вы не успели отгадать все мелодии.`);

    assert.equal(printResults([4, 5, 8, 20], {
      points: 10,
      restNotes: 0,
      restTime: 120
    }), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
});
