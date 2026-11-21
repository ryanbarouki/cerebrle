import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import App from './App';
import { loadAllResults, saveResults } from './save_local';

const open = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
const today = DateTime.now().toISODate();
const button = (name) => screen.getByRole('button', { name });
const click = (name) => fireEvent.click(button(name));
const advance = (ms) => act(() => jest.advanceTimersByTime(ms));

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test('sequence shows turn, progress and tap feedback, then saves the score', () => {
  jest.useFakeTimers();
  jest.spyOn(Math, 'random').mockReturnValue(0);
  open('/sequence');
  click('Start game');
  expect(screen.getByText('Watch the tiles')).toBeTruthy();
  advance(500);
  expect(button('Tile 1').dataset.lit).toBe('true');
  advance(500);
  expect(screen.getByText('Your turn')).toBeTruthy();
  click('Tile 1');
  expect(button('Tile 1').dataset.lit).toBe('true');
  advance(1500);
  click('Tile 1');
  expect(screen.getByText(/1 of 2 entered/)).toBeTruthy();
  click('Tile 3');
  expect(screen.getByRole('heading', { name: 'Today’s score 2' })).toBe(document.activeElement);
  expect(loadAllResults()[today].sequence).toBe(2);
});

test('number countdown advances to guessing and a miss shows both numbers', () => {
  jest.useFakeTimers();
  jest.spyOn(Math, 'random').mockReturnValue(0);
  open('/number');
  click('Start game');
  expect(screen.getByText('Memorize this number')).toBeTruthy();
  advance(5200);
  let input = screen.getByLabelText('Enter the number you saw');
  expect(button('Submit guess').disabled).toBe(true);
  fireEvent.change(input, { target: { value: '0' } });
  click('Submit guess');
  expect(screen.getByText('00')).toBeTruthy();
  advance(5200);
  input = screen.getByLabelText('Enter the number you saw');
  fireEvent.change(input, { target: { value: '01' } });
  click('Submit guess');
  expect(screen.getByText('Correct number').nextElementSibling.textContent).toBe('00');
  expect(screen.getByText('Your guess').nextElementSibling.textContent).toBe('01');
});

test('verbal shows why answers missed and a saved zero remains a result', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
  open('/word');
  click('Seen');
  expect(screen.getByText(/was new/)).toBeTruthy();
  click('New');
  expect(screen.getByText(/had appeared before/)).toBeTruthy();
  click('New');
  expect(screen.getByRole('heading', { name: 'Today’s score 0' })).toBeTruthy();
  expect(loadAllResults()[today].word).toBe(0);
  fireEvent.click(screen.getByRole('link', { name: 'Play Sequence Memory' }));
  fireEvent.click(screen.getByRole('link', { name: 'All games' }));
  fireEvent.click(screen.getByRole('link', { name: /Verbal Memory/ }));
  expect(screen.getByRole('heading', { name: 'Today’s score 0' })).toBeTruthy();
});

test('previous Number scores show without an invented guess', () => {
  saveResults(today, 'number', 4);
  open('/number');
  expect(screen.getByRole('heading', { name: 'Today’s score 4' })).toBeTruthy();
  expect(screen.queryByText('Your guess')).toBeNull();
});
