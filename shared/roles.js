const ROLES = [
  {
    name: 'keyholder',
    alignment: 'good',
    description: 'You hold the key',
    actions: ['identify good wizard'],
    color: 'magenta'
  },
  {
    name: 'good wizard',
    alignment: 'good',
    description: 'You need the keyholder to trust you',
    actions: 'identify the traitor',
  },
  {
    name: 'guard',
    alignment: 'good',
    description: 'You defend the keyholder',
    actions: 'identify the traitor',
  },
  {
    name: 'traitor',
    alignment: 'evil',
    description: 'You must sow discord and aid Evil Wizard',
    actions: 'can not stop the game',
  },
  {
    name: 'evil wizard',
    alignment: 'evil',
    description: 'You must find the keyholder',
    actions: 'identify the keyholder',
  }
];

module.exports = ROLES;
