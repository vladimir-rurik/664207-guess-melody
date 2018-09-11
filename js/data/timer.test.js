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
    timer.time = 2;
    assert.equal(timer.tick(), 1);
  });
  it(`should call function on end of time`, () => {
    let wasCalled = false;

    new Timer(2, null, () => {
      wasCalled = true;
    }).tick();
    assert.isFalse(wasCalled);

    new Timer(1, null, () => {
      wasCalled = true;
    }).tick();
    assert.isTrue(wasCalled);
  });
});
