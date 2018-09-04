import {assert} from 'chai';
import Timer from './timer';

describe(`Таймер`, () => {
  it(`Должен подсчитать количество оставшегося времени после тика`, () => {
    const timer = new Timer(20);
    const expectedFirst = 19;
    const expectedSecond = 18;
    const expectedThird = 17;

    assert.equal(timer.tick(), expectedFirst);
    assert.equal(timer.tick(), expectedSecond);
    assert.equal(timer.tick(), expectedThird);
  });

  it(`Должен вернуть null, если время вышло`, () => {
    const timer = new Timer(1);
    const expected = null;

    assert.equal(timer.tick(), expected);
  });

  it(`Должен вернуть null, если передано отрицательное время`, () => {
    const timer = new Timer(-10);
    const expected = null;

    assert.equal(timer.tick(), expected);
  });
});
