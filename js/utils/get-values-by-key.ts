const findElem = (nestedObject, correctKey, result) => {
  for (let key in nestedObject) {
    if (nestedObject.hasOwnProperty(key)) {
      if (key === correctKey) {
        result.push(nestedObject[key]);
      } else if (typeof nestedObject[key] === `object` && nestedObject[key] !== null) {
        findElem(nestedObject[key], correctKey, result);
      }
    }
  }

  return result;
};

export default (object, key) => {
  const result = [];

  return findElem(object, key, result);
};
