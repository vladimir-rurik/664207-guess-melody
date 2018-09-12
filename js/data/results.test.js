import {assert} from 'chai';
import {getResults, printResults} from './results';

describe(`Printing results`, () => {
  it(`should return right results on success`, () => {
    assert.deepEqual(getResults([{points: 1, time: 20}], 2, 10), [1, 2, 50]);
    assert.deepEqual(getResults([{points: 20, time: 120}], 19, 120), [2, 2, 0]);
    assert.deepEqual(getResults([
      {points: 12, time: 200},
      {points: 20, time: 120},
      {points: 20, time: 110},
      {points: 16, time: 120}
    ], 20, 100), [1, 5, 80]);
  });

  it(`should return right message on success`, () => {
    const result = printResults([1, 2, 3, 4, 5, 6, 7, 8, 9], {
      answers: Array(10).fill({success: true, time: 30}),
      points: 10,
      restAttempts: 3,
      restTime: 95
    });

    assert.equal(result.message, `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали 10&nbsp;баллов (0&nbsp;быстрых),
      <br>совершив 0&nbsp;ошибок`);

    assert.equal(result.comparison, `Вы заняли 1-ое место из 10. Это лучше чем у 90% игроков.`);

    const firstResult = printResults([], {
      answers: Array(10).fill({success: true, time: 30}),
      points: 10,
      restAttempts: 3,
      restTime: 95
    });

    assert.equal(firstResult.message, `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали 10&nbsp;баллов (0&nbsp;быстрых),
      <br>совершив 0&nbsp;ошибок`);

    assert.equal(firstResult.comparison, `Вы заняли 1-ое место из 1. Это лучше чем у 0% игроков.`);
  });

  it(`should return right message on lose`, () => {
    const resultLoseTime = printResults([4, 5, 8, 20], {
      points: 10,
      restAttempts: 2,
      restTime: 0
    });
    assert.equal(resultLoseTime.message, `Время вышло! Вы не успели<br> отгадать все мелодии.`);

    const resultLoseAssets = printResults([4, 5, 8, 20], {
      points: 10,
      restAttempts: 0,
      restTime: 120
    });
    assert.equal(resultLoseAssets.message, `У вас закончились все попытки.<br> Ничего, повезёт в следующий раз!`);
  });
});
