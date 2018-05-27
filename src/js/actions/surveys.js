import { SURVEYS_LOAD, SURVEYS_UNLOAD, SURVEY_LOAD, SURVEY_UNLOAD } from '../actions';
import { watchSurveys, unwatchSurveys, watchSurvey, unwatchSurvey } from '../api/surveys';

export function loadSurveys() {
  return dispatch => (
    watchSurveys()
      .on('success',
        payload => dispatch({ type: SURVEYS_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: SURVEYS_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadSurveys() {
  unwatchSurveys();
  return { type: SURVEYS_UNLOAD };
}

export function loadSurvey(id) {
  return dispatch => (
    watchSurvey(id)
      .on('success',
        payload => dispatch({ type: SURVEY_LOAD, payload })
      )
      .on('error',
        payload => dispatch({ type: SURVEY_LOAD, error: true, payload })
      )
      .start()
  );
}

export function unloadSurvey(id) {
  unwatchSurvey(id);
  return { type: SURVEY_UNLOAD };
}
