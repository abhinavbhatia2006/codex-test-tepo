import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../src/calculate.js';

for (const [expression, expected] of [
  ['2 + 3', 5], ['9 - 12', -3], ['6 * 7', 42], ['8 / 4', 2],
  ['2 + 3 * 4', 14], ['(2 + 3) * 4', 20], ['10 - 3 - 2', 5],
  ['24 / 3 / 2', 4], ['-3 * -2', 6], ['2 + -3', -1],
  ['.5 + 1.25', 1.75], ['0.1 + 0.2', 0.3], ['-(2 + 3)', -5],
  ['50 / 100 * 80', 40], ['1e3 + 2', 1002], ['1e-3 * 1000', 1],
]) {
  test(`evaluates ${expression}`, () => assert.equal(calculate(expression), expected));
}

for (const expression of ['', '1 / 0', '0 / 0', '2 +', '(2 + 3', '2 3',
  '2 ** 3', '1..2', 'alert(1)', 'Infinity', '1e309', '1e308 * 10', '2(3)']) {
  test(`rejects invalid input ${JSON.stringify(expression)}`, () => {
    assert.throws(() => calculate(expression), /expression|zero|large|finite|number|parenthes/i);
  });
}
