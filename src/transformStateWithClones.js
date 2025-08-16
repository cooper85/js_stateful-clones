'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 */
// eslint-disable-next-line no-unused-vars
const transformStateWithClones = (state, actions) => {
  const ACTION_ADD_PROPERTIES = 'addProperties';

  const ACTION_REMOVE_PROPERTIES = 'removeProperties';

  const ACTION_CLEAR = 'clear';

  const MESSAGE_ACTION_INVALID = 'Action invalid';

  const MESSAGE_EXTRA_DATA_NOT_DEFINED = 'Extra Data is not defied';

  const KEYS_TO_REMOVE_NOT_DEFINED = 'Keys To Remove is not defined';

  const initState = { ...state };

  const stateHistory = [];

  for (const action of actions) {
    if (typeof action.type === 'undefined') {
      continue;
    }

    switch (action.type) {
      case ACTION_ADD_PROPERTIES:
        if (typeof action.extraData === 'undefined') {
          throw new Error(MESSAGE_EXTRA_DATA_NOT_DEFINED);
        }

        Object.assign(initState, action.extraData);
        break;
      case ACTION_REMOVE_PROPERTIES:
        if (typeof action.keysToRemove === 'undefined') {
          throw new Error(KEYS_TO_REMOVE_NOT_DEFINED);
        }

        for (const key in initState) {
          if (action.keysToRemove.includes(key)) {
            delete initState[key];
          }
        }
        break;
      case ACTION_CLEAR:
        for (const property in initState) {
          if (Object.hasOwn(initState, property)) {
            delete initState[property];
          }
        }
        break;
      default:
        throw new Error(MESSAGE_ACTION_INVALID);
    }
    // add cloned copy to stack
    stateHistory.push({ ...initState });
  }

  return stateHistory;
};

module.exports = transformStateWithClones;
