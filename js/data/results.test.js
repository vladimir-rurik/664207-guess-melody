import {assert} from 'chai';
import {getResults, printResults} from './results';

describe(`Printing results`, () => {
  it(`should return right results on success`, () => {
    assert.deepEqual(getResults([1], 2), [1, 2, 50]);
    assert.deepEqual(getResults([20], 19), [2, 2, 0]);
    assert.deepEqual(getResults([4, 5, 8, 20], 15), [2, 5, 60]);
  });

  // it(`should return right message on success`, () => {
  //   const userResult = {
  //     points: 9,
  //     restAttempts: 2,
  //     restTime: 95
  //   };
  //   assert.deepEqual(printResults([1, 2, 3, 4, 5, 6, 7, 8, 9], userResult), {
  //     message: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
  //     <br>вы&nbsp;набрали 10&nbsp;баллов (0&nbsp;быстрых),
  //     <br>совершив 0&nbsp;ошибок`,
  //     comparison: `Вы заняли 1-ое место из 10. Это лучше чем у 90% игроков.`
  //   });
  // });

  it(`should return right message on lose`, () => {
    assert.deepEqual(printResults([4, 5, 8, 20], {
      answers: Array(10).fill({success: true, time: 30}),
      points: 10,
      restAttempts: 3,
      restTime: 0
    }), {
      message: `Время вышло! Вы не успели отгадать все мелодии.`,
      comparison: ``
    });

    assert.deepEqual(printResults([4, 5, 8, 20], {
      points: 10,
      restAttempts: 0,
      restTime: 120
    }), {
      message: `У вас закончились все попытки.<br> Ничего, повезёт в следующий раз!`,
      comparison: ``
    });
  });
});
