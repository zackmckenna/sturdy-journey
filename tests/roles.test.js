const ROLES = require('../shared/roles');
const isGood = require('../utils/for_testing').isGood;

test('Are they good', () => {
  const result = isGood(ROLES[0].alignment);

  expect(result).toBe(true);
});
