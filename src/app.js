import { calculate } from './calculate.js';

const form = document.querySelector('#calculator-form');
const input = document.querySelector('#expression');
const message = document.querySelector('#message');
const list = document.querySelector('#history-list');
const empty = document.querySelector('#empty-history');
let justCalculated = false;

function status(text, error = false) {
  message.textContent = text;
  message.classList.toggle('error', error);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const expression = input.value;
  try {
    const result = calculate(expression);
    input.value = String(result);
    justCalculated = true;
    status(`${expression} =`);
    const entry = document.createElement('li');
    const calculation = document.createElement('span');
    const answer = document.createElement('strong');
    calculation.textContent = expression;
    answer.textContent = String(result);
    entry.append(calculation, answer);
    list.prepend(entry);
    if (list.children.length > 6) list.lastElementChild.remove();
    empty.hidden = true;
  } catch (error) {
    status(error.message, true);
  }
});

form.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.type === 'submit') return;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? start;
  if (button.dataset.action === 'clear') {
    input.value = '';
    status('A fresh start.');
  } else if (button.dataset.action === 'delete') {
    input.setRangeText('', start === end ? Math.max(0, start - 1) : start, end, 'end');
  } else {
    if (justCalculated && /^[\d.(]$/.test(button.dataset.value)) input.value = '';
    if (input.value.length < 500) input.setRangeText(button.dataset.value, input.selectionStart, input.selectionEnd, 'end');
    status('Press enter or = to calculate.');
  }
  justCalculated = false;
  input.focus();
});

input.addEventListener('input', () => { justCalculated = false; status('Press enter or = to calculate.'); });
input.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    input.value = '';
    justCalculated = false;
    status('A fresh start.');
  }
});
document.querySelector('#clear-history').addEventListener('click', () => {
  list.replaceChildren();
  empty.hidden = false;
});
