const GAMELOGIC = require('../shared/gameLogic');
const setPlayerCountLogic = require('../utils/for_testing').setPlayerCountLogic;

test('One wizard for 4 player game', () => {
  const game = setPlayerCountLogic(4, GAMELOGIC);
  expect(game.wizards).toBe(1);
});

test('Two wizard for 5 player game', () => {
  const game = setPlayerCountLogic(5, GAMELOGIC);
  expect(game.wizards).toBe(2);
});

test('Two wizards for 6 player game', () => {
  const game = setPlayerCountLogic(6, GAMELOGIC);
  expect(game.wizards).toBe(2);
});

test('Two wizards for 7 player game', () => {
  const game = setPlayerCountLogic(7, GAMELOGIC);
  expect(game.wizards).toBe(2);
});

test('Two wizards for 8 player game', () => {
  const game = setPlayerCountLogic(8, GAMELOGIC);
  expect(game.wizards).toBe(2);
});

test('Three wizards for 9 player game', () => {
  const game = setPlayerCountLogic(9, GAMELOGIC);
  expect(game.wizards).toBe(3);
});

test('Three wizards for 10 player game', () => {
  const game = setPlayerCountLogic(10, GAMELOGIC);
  expect(game.wizards).toBe(3);
});

