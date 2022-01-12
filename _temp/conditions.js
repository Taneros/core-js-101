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
