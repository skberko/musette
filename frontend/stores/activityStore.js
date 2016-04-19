var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var ActivityConstants = require('../constants/activityConstants.js');
var ActivityStore = new Store(Dispatcher);

var _activities = {};

var resetActivities = function (activities) {
  _activities = {};
  activities.forEach(function (activity) {
    _activities[activity.id] = activity;
  });
};

var resetActivity = function (activity) {
  _activities[activity.id] = activity;
};

ActivityStore.all = function () {
  var activities = [];
  for (var id in _activities) {
    debugger
    activities.push(_activities[id]);
  }
  return activities;
}

ActivityStore.find = function (id) {
  return _activities[id];
}

ActivityStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case activityConstants.ACTIVITIES_RECEIVED:
      resetActivities(payload.activities);
      ActivityStore.__emitChange();
      break;
    case activityConstants.ACTIVITY_RECEIVED:
      resetActivity(payload.activity);
      ActivityStore.__emitChange();
      break;
  }
}

module.exports = ActivityStore;

// For console testing purposes only;
// to be removed before app goes into production:
window.ActivityStore = ActivityStore
