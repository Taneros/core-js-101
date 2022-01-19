/**
 * Returns the id generator function that returns next integer starting
 * from specified number every time when invoking.
 *
 * @param {Number} startFrom
 * @return {Function}
 *
 * @example
 *   const getId4 = getIdGenerator(4);
 *   const getId10 = gerIdGenerator(10);
 *   getId4() => 4
 *   getId10() => 10
 *   getId4() => 5
 *   getId4() => 6
 *   getId4() => 7
 *   getId10() => 11
 */
// function getIdGeneratorFunction(startFrom) {
//   return new GetIdGenerator(startFrom)
// }

// function GetIdGenerator(startFrom) {
//   this.startFromm = startFrom
//   this.firstTime = true

//   const newFuncToBind = function () {
//     if (this.firstTime) {
//       this.firstTime = false
//       return this.startFromm
//     }
//     this.startFromm += 1
//     return this.startFromm
//   }

//   return newFuncToBind.bind(this)
// }

// const getId4 = getIdGeneratorFunction(4)

// getId4() //?
// getId4() //?
// getId4() //?
// getId4() //?
// getId4() //?

// const getId10 = getIdGeneratorFunction(10)

// getId10() //?
// getId10() //?
// getId10() //?
// getId10() //?
// getId10() //?

// const f20 = getIdGeneratorFunction(20)
// f20() //?
// f20() //?
// f20() //?
// f20() //?
// f20() //?

// function getIdGeneratorFunction(startFrom) {
//   this.startFromm = startFrom;
//   this.firstTime = true;
//   return () => {
//     if (this.firstTime) {
//       this.firstTime = false;
//       return this.startFromm;
//     }
//     this.startFromm += 1;
//     return this.startFromm;
//   };
// }

/**
 * Returns the polynom function of one argument based on specified coefficients.
 * See: https://en.wikipedia.org/wiki/Polynomial#Definition
 *
 * @params {integer}
 * @return {Function}
 *
 * @example
 *   getPolynom(2,3,5) => y = 2*x^2 + 3*x + 5
 *   getPolynom(1,-3)  => y = x - 3
 *   getPolynom(8)     => y = 8
 *   getPolynom()      => null
 */
// function getPolynom(...args) {
//   args.reverse()

//   const newArr = Array.from(args)

//   if (args.length) {
//     return newArr
//       .reduce((acc, el, idx) => {
//         if (idx === 0 && newArr.length > 1) acc.push(String(el)[0] === '-' ? `- ${String(el).slice(1)}` : `+ ${el}`)
//         else if (idx === 0 && newArr.length <= 1) acc.push(String(el)[0] === '-' ? `- ${String(el).slice(1)}` : `${el}`)
//         if (idx === 1) acc.push(String(el)[0] === '-' ? `${el}*x` : `+ ${el}*x`)
//         if (idx > 1) {
//           if (idx !== newArr.length - 1) acc.push(String(el)[0] === '-' ? `- ${String(el).slice(1)}*x^${idx}` : `+ ${el}*x^${idx}`)
//           else acc.push(`${el}*x^${idx}`)
//         }
//         return acc
//       }, [])
//       .concat('y =')
//       .reverse()
//       .join(' ')
//   }

//   return null
// }

function getPolynom(...args) {
  args;
  const coeffArr = Array.from(args); //?

  return function (x) {
    let result = coeffArr[0];
    for (let i = 1; i < coeffArr.length; i += 1) {
      result = result * x + coeffArr[i];
      return result;
    }
  };
}

const a = getPolynom(-3, 5, -5, 6, 7, -3); //?

a(); //?

/**
 * Memoizes passed function and returns function
 * which invoked first time calls the passed function and then always returns cached result.
 *
 * @params {Function} func - function to memoize
 * @return {Function} memoized function
 *
 * @example
 *   const memoizer = memoize(() => Math.random());
 *   memoizer() => some random number  (first run, evaluates the result of Math.random())
 *   memoizer() => the same random number  (second run, returns the previous cached result)
 *   ...
 *   memoizer() => the same random number  (next run, returns the previous cached result)
 */
// function memoize(func) {
//   this.memory = !this.memory ? func() : this.memory

//   return () => this.memory
// }

// const memoizer = memoize(() => Math.random())

// memoizer() //?
// memoizer() //?

/**
 * Returns the function trying to call the passed function and if it throws,
 * retrying it specified number of attempts.
 *
 * @param {Function} func
 * @param {number} attempts
 * @return {Function}
 *
 * @example
 * const attempt = 0, retryer = retry(() => {
 *      if (++attempt % 2) throw new Error('test');
 *      else return attempt;
 * }, 2);
 * retryer() => 2
 */

// *********first try

function retry(func, attempts) {
  let attemptsS = attempts;

  return function rec() {
    try {
      return func();
    } catch (error) {
      attemptsS -= 1;
      if (attemptsS > 0) return rec();
    }
    return null;
  };
}

const retryer = retry(() => {
  if (++attempt % 2) throw new Error('test');
  else return attempt;
}, 2);

retryer(); //?

// function retry(func, attempts) {
//   this.tried = !this.tried ? false : true
//   this.attempts = !this.attempts ? attempts : this.attempts
//   this.initialAttempts = !this.tried ? attempts : this.initialAttempts

//   return () => {
//     try {
//       if (this.attempts === 1) return this.initialAttempts
//       func()
//     } catch (error) {
//       this.attempts = this.attempts - 1
//       retry(func, this.attempts)
//     }
//   }
// }

// function retry(func, attempts) {

//   this.func = func
//   this.attempts = attempts

//   return function (func, attempts) {
//     let error
//     for (let retries = 0; retries < attempts; retries += 1) {
//       try {
//         return func()
//       } catch (err) {
//         error = err
//       }
//     }
//     return attempts
//   }
// }

/**
 * Returns the logging wrapper for the specified method,
 * Logger has to log the start and end of calling the specified function.
 * Logger has to log the arguments of invoked function.
 * The format of output log is:
 * <function name>(<arg1>, <arg2>,...,<argN>) starts
 * <function name>(<arg1>, <arg2>,...,<argN>) ends
 *
 *
 * @param {Function} func
 * @param {Function} logFunc - function to output log with single string argument
 * @return {Function}
 *
 * @example
 *
 * const cosLogger = logger(Math.cos, console.log);
 * const result = cosLogger(Math.PI));     // -1
 *
 * log from console.log:
 * cos(3.141592653589793) starts
 * cos(3.141592653589793) ends
 *
 */
// const funcName = `${func}`.split(' ')[1].split('()').join('')

// function logger(func, logFunc) {

//   const funcNamee = func.name //?

//   return function(...x) {
//     logFunc(`${funcNamee}(${x})`)
//     func(x)
//     logFunc(`${funcNamee}(${x})`)
//   }
// }

function logger(func, logFunc) {
  const funcName = func.name;
  const logger = logFunc;

  return function (x) {
    return new Promise((res, rej) => {
      res(x);
    })
      .then((x) => {
        logger(func(x), `${funcName}(${x}) start`);
        return x;
      })
      .then((x) => {
        logger(func(x), `${funcName}(${x}) end`);
      });
  };
}

function logger(func, logFunc) {
  const funcName = func.name;
  const loggeRr = logFunc;
  return function (x) {
    loggeRr(`${funcName}(${x}) start`);
    loggeRr(`${funcName}(${x}) start`);
    return func(x);
  };
}

const cosLogger = logger(Math.cos, console.log); //?

const result = cosLogger(Math.PI); //?

//  log from console.log:
//  cos(3.141592653589793) starts
//  cos(3.141592653589793) ends
