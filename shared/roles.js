export const ROLES = [
  {
    name: 'Keyholder',
    alignment: 'Good',
    description: 'You hold the key',
    actions: ['identify good wizard'],
    color: 'magenta'
  },
  {
    name: 'Good Wizard',
    alignment: 'Good',
    description: 'You need the keyholder to trust you',
    actions: 'identify the traitor',
  },
  {
    name: 'Guard',
    alignment: 'Good',
    description: 'You defend the keyholder',
    actions: 'identify the traitor',
  },
  {
    name: 'Traitor',
    alignment: 'Evil',
    description: 'You must sow discord and aid Evil Wizard',
    actions: 'can not stop the game',
  },
  {
    name: 'Evil Wizard',
    alignment: 'Evil',
    description: 'You must find the keyholder',
    actions: 'identify the keyholder',
  }
]
