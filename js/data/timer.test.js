/* eslint-disable no-console */
import {assert} from 'chai';
import Timer from './timer';

describe(`Creating timer`, () => {
  it(`should return object with timer`, () => {
    assert.isObject(new Timer());
  });
  it(`should return right time on tick call`, () => {
    const timer = new Timer(300);
    assert.equal(timer.tick(), 299);
    timer.time = 30;
    assert.equal(timer.tick(), 29);
    timer.time = 1;
    assert.equal(timer.tick(), 0);
  });
  it(`should return null on end of time`, () => {
    assert.equal(new Timer(0).tick(), null);
  });
  it(`should call function on end of time`, () => {
    let wasCalled = false;

    new Timer(1, null, () => {
      wasCalled = true;
    }).tick();
    assert.isFalse(wasCalled);

    new Timer(0, null, () => {
      wasCalled = true;
    }).tick();
    assert.isTrue(wasCalled);
  });
});
