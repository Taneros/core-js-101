function chainPromises(array, action) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    array.forEach((value, index) => {
      value
        .then((result) => {
          results[index] = result;
          completed += 1;
          if (completed === array.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  }).then((arr) => arr.reduce((acc, el) => action(acc, el)));
}

// function chainPromises(array, action) {
//   return new Promise((resolve, reject) => {
//     const results = []
//     array.forEach((value, index) => {
//       value.then((result) => {
//         results.push(result)
//         if (index + 1 === array.length) {
//           resolve(results)
//         }
//       })
//     })
//   }).then((arr) => arr.reduce(action))
// }

const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
const p = chainPromises(promises, (a, b) => a + b);
p.then((res) => {
  console.log(res);
}); //?

// const promisess = [Promise.resolve(2), Promise.resolve(1), Promise.resolve(4)];
// const pp = chainPromises(promisess, (a, b) => a * b);
// pp.then((res) => {
//   console.log(res);
// });

// const promisesss = [Promise.resolve(2), Promise.reject('err'), Promise.resolve(4)]
// const ppp = chainPromises(promisesss, (a, b) => a - b)
// ppp.then((res) => {
//   console.log(res)
// })

// const promisesss = [];
// const ppp = chainPromises(promisesss, (a, b) => a - b);
// ppp.then((res) => {
//   console.log(res);
// }); //?
