/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
// function willYouMarryMe(isPositiveAnswer) {
//   return new Promise((res, rej) => {
//     const pos = 'Hooray!!! She said "Yes"!';
//     const neg = 'Oh no, she said "No"';
//     if (typeof isPositiveAnswer === 'boolean' && isPositiveAnswer) res(pos);
//     else if (typeof isPositiveAnswer === 'boolean' && !isPositiveAnswer) res(neg);
//     rej({ message: 'Error: Wrong parameter is passed!' });
//   });
// }

// const p1 = willYouMarryMe(true);
// p1.then((answer) => console.log(answer));

// const p2 = willYouMarryMe(false);
// p2.then((answer) => console.log(answer));

// const p3 = willYouMarryMe();
// p3.then((answer) => console.log(answer)).catch((error) => console.log(error.message));

/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
// function processAllPromises(array) {
//   return Promise.all(array);
// }

// const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)];

// const p = processAllPromises(promises);
// p.then((res) => {
//   console.log(res);
// }); //?

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */

// function chainPromises(array, action) {
//   return Promise.all(array.map((p) => p.catch((e) => e)))
//     .then((values) => values.filter((v) => typeof v === 'number'))
//     .then((arr) =>
//       arr.reduce((acc, el) => {
//         return action(acc, el);
//       })
//     );
// }
// function chainPromises(array, action) {
//   const newArr = array.map((p) => p.catch((e) => e));
//   return newArr
//     .reduce((accumulator, value) => {
//       return accumulator.then((results) => {
//         return Promise.resolve(value).then((result) => {
//           return [...results, result];
//         });
//       });
//     }, Promise.resolve([]))
//     .then((values) => values.filter((v) => typeof v === 'number'))
//     .then((arr) =>
//       arr.reduce((acc, el) => {
//         return action(acc, el);
//       })
//     );
// }

// function chainPromises(array, action) {
//   return new Promise((resolve, reject) => {
//     let results = [];
//     let completed = 0;
//     array.forEach((value, index) => {
//       Promise.resolve(value)
//         .then((result) => {
//           results[index] = result;
//           completed += 1;
//           if (completed == values.length) {
//             resolve(results);
//           }
//         })
//         .catch((err) => reject(err));
//     });
//   }).then((value) => console.log(value));
// }

// function chainPromises(array, action) {
//   const newArr = array.map((p) => p.catch((e) => e));

//   // Base case.
//   if (newArr.length === 0) {
//     return Promise.resolve([]);
//   }

//   const [first, ...rest] = newArr;

// Calling Promise.resolve on the first value because it could
// be either a Promise or an actual value.
//   return Promise.resolve(first)
//     .then((firstResult) => {
//       return chainPromises(rest).then((restResults) => {
//         return [firstResult, ...restResults];
//       });
//     })
//     .then((values) => values.filter((v) => typeof v === 'number'))
//     .then((v) => v.reduce((acc, el) => acc + el), 0);
// }

// const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
// const p = chainPromises(promises, (a, b) => a + b);
// p.then((res) => {
//   console.log(res);
// }); //?

// const promisess = [Promise.resolve(2), Promise.resolve(1), Promise.resolve(4)];
// const pp = chainPromises(promisess, (a, b) => a * b);
// pp.then((res) => {
//   console.log(res);
// });

const promisesss = [Promise.resolve(2), Promise.reject('err'), Promise.resolve(4)];
const ppp = chainPromises(promisesss, (a, b) => a - b);
ppp.then((res) => {
  console.log(res);
}); //?

// const promisesss = [];
// const ppp = chainPromises(promisesss, (a, b) => a - b);
// ppp.then((res) => {
//   console.log(res);
// }); //?
