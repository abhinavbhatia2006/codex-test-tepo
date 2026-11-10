# Pocket Calculator

A small browser calculator with a responsive interface, keyboard input, and a six-entry scratchpad.

## Run locally

Requires Node.js 22 or newer. No package installation is needed.

```sh
npm start
```

Open http://127.0.0.1:4173. To run the arithmetic tests:

```sh
npm test
```

## Features

- Addition, subtraction, multiplication, and division
- Standard operator precedence, parentheses, decimals, and negative numbers
- Enter to calculate; Escape to clear the focused expression field
- Editable expressions and a delete button
- Friendly errors for incomplete expressions and division by zero
- Session-only calculation history with a clear button

Expressions are parsed directly without `eval`. Results are rounded to 12 significant digits to reduce floating-point display artifacts. Use explicit multiplication, such as `2 * (3 + 4)`. This is an everyday calculator, not an arbitrary-precision arithmetic tool.

## Project structure

- `index.html`, `styles.css`, `src/app.js`: interface and browser interactions
- `src/calculate.js`: standalone arithmetic parser
- `test/`: arithmetic regression tests
- `.github/workflows/test.yml`: tests on pushes and pull requests

## Development

Work in feature branches and open pull requests against `main`. Keep interface work separate from arithmetic changes where practical. Run `npm test` before requesting review.
