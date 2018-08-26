import {assert} from 'chai';
import {INITIAL_GAME} from './changeLevel';
import {changeAttempts} from './changeAttempts';

describe(`Check attempt changer`, () => {

  it(`should update attempt count of the game`, () => {
    assert.equal(changeAttempts(INITIAL_GAME, 1).attempts, 1);
    assert.equal(changeAttempts(INITIAL_GAME, 2).attempts, 2);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeAttempts(INITIAL_GAME, -1).attempts, /Attempt count should not be negative value/);
  });


  it(`should not allow exceed the maximum attempt`, () => {
    assert.throws(() => changeAttempts(INITIAL_GAME, 4).attempts, /Attempt count cannot exceed the maximum attempt/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeAttempts(INITIAL_GAME, []).attempts, /Attempt count should be of type number/);
  });

  it(`Game Over`, () => {
    assert.equal(changeAttempts(INITIAL_GAME, 0), `Game Over`);
  });

});
