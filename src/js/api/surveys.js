import RequestWatcher from './request-watcher';

let protocol = 'ws:';
if (window.location.protocol === 'https:') {
  protocol = 'wss:';
}
const host = ((process.env.NODE_ENV === 'development') ?
  'localhost:8102' : `${window.location.host}`);
const webSocketUrl = `${protocol}//${host}`;

const socketWatcher = new RequestWatcher({ webSocketUrl });

let surveysWatcher;

export function watchSurveys() {
  surveysWatcher = socketWatcher.watch('/api/survey');
  return surveysWatcher;
}

export function unwatchSurveys() {
  if (surveysWatcher) {
    surveysWatcher.stop();
  }
}

const surveyWatcher = {};

export function watchSurvey(id) {
  surveyWatcher[id] = socketWatcher.watch(`/api/survey/${id}`);
  return surveyWatcher[id];
}

export function unwatchSurvey(id) {
  if (surveyWatcher[id]) {
    surveyWatcher[id].stop();
  }
}
