export function calculate(expression) {
  if (typeof expression !== 'string' || !expression.trim() || expression.length > 500) {
    throw new Error('Enter an expression of up to 500 characters.');
  }
  const tokens = expression.match(/(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?|[^\s]/gi) ?? [];
  let position = 0;
  const peek = () => tokens[position];
  function primary() {
    if (peek() === '+' || peek() === '-') {
      const sign = tokens[position++];
      return (sign === '-' ? -1 : 1) * primary();
    }
    if (peek() === '(') {
      position++;
      const value = sum();
      if (tokens[position++] !== ')') throw new Error('Check your parentheses.');
      return value;
    }
    const token = tokens[position++];
    if (!token || !/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(token)) {
      throw new Error('Expected a number or parentheses.');
    }
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error('Number is too large.');
    return value;
  }
  function product() {
    let value = primary();
    while (peek() === '*' || peek() === '/') {
      const operator = tokens[position++];
      const right = primary();
      if (operator === '/' && right === 0) throw new Error('Cannot divide by zero.');
      value = operator === '*' ? value * right : value / right;
    }
    return value;
  }
  function sum() {
    let value = product();
    while (peek() === '+' || peek() === '-') {
      const operator = tokens[position++];
      const right = product();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  }
  const result = sum();
  if (position !== tokens.length) throw new Error('Check your expression.');
  if (!Number.isFinite(result)) throw new Error('Result is too large.');
  return Number(result.toPrecision(12));
}
