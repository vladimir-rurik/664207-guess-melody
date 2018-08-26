import {assert} from 'chai';
import {calcScoring} from './scoring';

describe(`Checking the scoring`, () => {
  it(`Should return number`, () => {
    assert.typeOf(calcScoring([], 3), `number`);
  });

  it(`should return right points for win result`, () => {
    assert.equal(calcScoring(Array(10).fill({success: true, time: 40}), 3), 10);
    assert.equal(calcScoring(Array(10).fill({success: true, time: 10}), 3), 20);
    assert.equal(calcScoring([
      {success: false, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: true, time: 20},
      {success: false, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30},
      {success: true, time: 30}
    ], 1), 8);
  });

  it(`should return -1 if the answers are less than questions`, () => {
    assert.equal(calcScoring([], 3), -1);
    assert.equal(calcScoring(Array(9).fill({success: true, time: 30}), 3), -1);
    assert.equal(calcScoring(Array(9).fill({success: true, time: 0}), 3), -1);
  });

  it(`should return -1 if all attempts are over`, () => {
    assert.equal(calcScoring(Array(3).fill({success: false, time: 2}), 0), -1);
  });

  it(`should throws Error when wrong answers don't match the rest notes`, () => {
    assert.throws(() => calcScoring(Array(2).fill({success: false, time: 30}), 3), Error);
    assert.throws(() => calcScoring(Array(4).fill({success: false, time: 30}), 3), Error);
  });
});
