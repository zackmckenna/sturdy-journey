const ROLES = [
  {
    id: 1,
    name: 'keyholder',
    alignment: 'good',
    description: 'You hold the key',
    actions: ['identify good wizard'],
    color: 'magenta'
  },
  {
    id: 2,
    name: 'good wizard',
    alignment: 'good',
    description: 'You need the keyholder to trust you',
    actions: 'identify the traitor',
  },
  {
    id: 3,
    name: 'guard',
    alignment: 'good',
    description: 'You defend the keyholder',
    actions: 'identify the traitor',
  },
  {
    id: 4,
    name: 'traitor',
    alignment: 'evil',
    description: 'You must sow discord and aid Evil Wizard',
    actions: 'can not stop the game',
  },
  {
    id: 5,
    name: 'evil wizard',
    alignment: 'evil',
    description: 'You must find the keyholder',
    actions: 'identify the keyholder',
  }
];

module.exports = ROLES;
