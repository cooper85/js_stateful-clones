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

  const stateHistory = [];

  let previousState = state;

  for (const action of actions) {
    // preserve state and use copy of it for each iteration
    let stateCopy = Object.assign({}, previousState);

    if (typeof action.type !== 'undefined') {
      switch (action.type) {
        case ACTION_ADD_PROPERTIES:
          if (typeof action.extraData === 'undefined') {
            throw new Error(MESSAGE_EXTRA_DATA_NOT_DEFINED);
          }

          Object.assign(stateCopy, action.extraData);
          break;
        case ACTION_REMOVE_PROPERTIES:
          if (typeof action.keysToRemove === 'undefined') {
            throw new Error(KEYS_TO_REMOVE_NOT_DEFINED);
          }

          for (const key in stateCopy) {
            if (action.keysToRemove.includes(key)) {
              delete stateCopy[key];
            }
          }
          break;
        case ACTION_CLEAR:
          for (const property in stateCopy) {
            if (Object.hasOwn(stateCopy, property)) {
              delete stateCopy[property];
            }
          }
          break;
        default:
          throw new Error(MESSAGE_ACTION_INVALID);
      }
      stateHistory.push({ ...stateCopy });
      stateCopy = Object.assign({}, stateCopy);
      previousState = stateCopy;
    }
  }

  return stateHistory;
};

module.exports = transformStateWithClones;
