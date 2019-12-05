const isNeutralWizard = string => string === 'wizard';

const isGuard = string => string === 'guard';

const isKeyholder = string => string === 'keyholder';

const isTraitor = string => string === 'traitor';

const isGood = string => string === 'good';

const isEvil = string => string === 'evil';

const setPlayerCountLogic = (players, gameLogic) => {
  return gameLogic.filter(game => game.players === players)[0];
};



module.exports = {
  isNeutralWizard,
  isTraitor,
  isKeyholder,
  isGuard,
  isGood,
  isEvil,
  setPlayerCountLogic
};
