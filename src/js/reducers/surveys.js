import { SURVEYS_LOAD, SURVEYS_UNLOAD, SURVEY_LOAD, SURVEY_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  surveys: [],
  survey: undefined
};

const handlers = {
  [SURVEYS_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [SURVEYS_UNLOAD]: () => initialState,
  [SURVEY_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return { error: action.payload };
  },
  [SURVEY_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
