/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  const r = circle.radius ** 2;
  const dist = (point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2;
  if (dist < r) return true;
  return false;
}

isInsideCircle({ center: { x: 0, y: 0 }, radius: 10 }, { x: 0, y: 0 }); //?

/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  const strObj = str.split('').reduce((acc, el) => {
    if (el in acc) acc[el] += 1;
    else acc[el] = 0;
    return acc;
  }, {});
  for (let [k, v] of Object.entries(strObj)) {
    if (v === 0) return k;
  }
  return null;
}

findFirstSingleChar('entente'); //?

/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const arr = [a, b].sort((a, b) => a - b);
  arr.unshift(isStartIncluded ? '[' : '(');
  arr.push(isEndIncluded ? ']' : ')');
  arr;
  arr.splice(2, 0, ', ');
  return arr.join('');
}

getIntervalString(0, 1, true, true); //?
getIntervalString(0, 1, true, false); //?

/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
// function isCreditCardNumber(ccn) {}

function isCreditCardNumber(num) {
  const inputNum = num.toString();
  let sum = 0;
  let doubleUp = false;

  for (var i = inputNum.length - 1; i >= 0; i -= 1) {
    let curDigit = parseInt(inputNum.charAt(i));

    if (doubleUp) {
      if (curDigit * 2 > 9) {
        sum += curDigit * 2 - 9;
      } else {
        sum += curDigit * 2;
      }
    } else {
      sum += curDigit;
    }
    doubleUp = !doubleUp;
  }

  return sum % 10 == 0 ? true : false;
}

isCreditCardNumber(4012888888881881); //?
isCreditCardNumber(4571234567890111); //?

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  const numArr = String(num).split(''); //?
  numArr; //?
  const sumOne = numArr.reduce((acc, el) => acc + Number(el), 0); //?
  const numSumArr = String(sumOne)
    .split('')
    .reduce((acc, el) => acc + Number(el), 0);
  return numSumArr;
}

getDigitalRoot(12345); //?
getDigitalRoot(10000); //?

/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  return num.toString(n);
}

toNaryString(365, 4); //?

/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */

const getMatrixProduct = (m1, m2) => m1.map((row, i) => m2[0].map((_, j) => row.reduce((acc, _, n) => acc + m1[i][n] * m2[n][j], 0)));

getMatrixProduct(
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
); //?

/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  if (!str.length) return true;
  const openBrackets = ['[', '(', '<', '{'];
  const brackets = {
    ['}']: '{',
    [']']: '[',
    [')']: '(',
    ['>']: '<',
  };
  const checkingArrStack = [];

  for (let i = 0; i < str.length; i += 1) {
    const currChar = str[i];
    if (openBrackets.includes(currChar)) {
      checkingArrStack.push(currChar);
    } else {
      if (!checkingArrStack.length) {
        return false;
      }
      const topEl = checkingArrStack[checkingArrStack.length - 1];

      if (brackets[currChar] === topEl) {
        checkingArrStack.pop();
      } else {
        return false;
      }
    }
  }
  return checkingArrStack.length === 0;
}

isBracketsBalanced('[{{{{}}}}]'); //?

/**
 * Returns the common directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/verbalizer/logs'] => '/'
 */
function getCommonDirectoryPath(paths) {
  const pathOne = paths[0].split('/'); //?

  const splitArr = paths.map((el) => el.split('/')).slice(1); //?

  const common = [];

  splitArr.forEach((el) => {
    el.forEach((ell, idx) => {
      if (ell === pathOne[idx]) common.push(ell);
    });
  });

  return common.join('/');
}

// getCommonDirectoryPath(['/web/images/image1.png', '/web/images/image2.png']); //?
// getCommonDirectoryPath(['/web/assets/style.css', '/web/scripts/app.js', 'home/setting.conf']); //?

function getCommonDirectoryPath(array) {
  const sortedArr = array.concat().sort(); //?
  const firstEl = sortedArr[0];
  const lastEl = sortedArr[sortedArr.length - 1];
  const firstElLen = firstEl.length;
  let i = 0;
  while (i < firstElLen && firstEl.charAt(i) === lastEl.charAt(i)) i += 1;
  const str = firstEl.substring(0, i);
  if (str[str.length - 1] === '/' || str[str.length - 1] === undefined) return str;
  return `${str.split('/').slice(0, -1).join('/')}/`;
}

getCommonDirectoryPath(['/web/images/image1.png', '/web/ images/image2.png', '/web/images/image3.png']); //?
// getCommonDirectoryPath(['/web/images/image1.png', '/web/images/limage2.png']); //?
// getCommonDirectoryPath(['/web/assets/style.css', '/web/scripts/app.js', 'home/setting.conf']); //?
// getCommonDirectoryPath(['/web/assets/style.css', '/.bin/mocha', '/read.me']); //?

/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
// function evaluateTicTacToePosition(position) {
//   // horiz
//   if (position[0][0] === position[0][1] && position[0][0] === position[0][2]) {
//     return position[0][0];
//   } else if (position[1][0] === position[1][1] && position[1][0] === position[1][2]) {
//     return position[1][3];
//   } else if (position[2][0] === position[2][1] && position[2][0] === position[2][2]) {
//     return position[2][2];
//     // vert
//   } else if (position[0][0] === position[1][0] && position[0][0] === position[2][0]) {
//     return position[0][0];
//   } else if (position[0][1] === position[1][1] && position[0][1] === position[2][1]) {
//     return position[0][1];
//   } else if (position[0][2] === position[1][2] && position[0][2] === position[2][2]) {
//     return position[0][2];
//   } else if (position[0][0] === position[1][1] && position[0][0] === position[2][2]) {
//     return position[0][0];
//   } else if (position[0][2] === position[1][1] && position[0][2] === position[2][0]) {
//     return position[0][2];
//   }
//   return undefined;
// }

function evaluateTicTacToePosition(position) {
  // horiz

  const winner = [];

  if (position[0][0] !== undefined && position[0][0] === position[0][1] && position[0][0] === position[0][2]) {
    return position[0][0];
  }
  if (position[1][0] !== undefined && position[1][0] === position[1][1] && position[1][0] === position[1][2]) {
    return position[1][2];
  }
  if (position[2][0] !== undefined && position[2][0] === position[2][1] && position[2][0] === position[2][2]) {
    return position[2][0];
    // vert
  }
  if (position[0][0] !== undefined && position[0][0] === position[1][0] && position[0][0] === position[2][0]) {
    return position[0][0];
  }
  if (position[0][1] !== undefined && position[0][1] === position[1][1] && position[0][1] === position[2][1]) {
    return position[0][1];
  }
  if (position[0][2] !== undefined && position[0][2] === position[1][2] && position[0][2] === position[2][2]) {
    return position[0][2];
  }
  if (position[0][0] !== undefined && position[0][0] === position[1][1] && position[0][0] === position[2][2]) {
    return position[0][0];
  }
  if (position[0][2] !== undefined && position[0][2] === position[1][1] && position[0][2] === position[2][0]) {
    return position[0][2];
  }
  return undefined;
}

// ???
// -------------
// |   |   |   |
// -------------
// | X |   | X |
// -------------
// | 0 | 0 | 0 |
// -------------

evaluateTicTacToePosition([
  [, , ,],
  ['X', , 'X'],
  ['0', '0', '0'],
]); //?
