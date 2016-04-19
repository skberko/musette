var Dispatcher = require('../dispatcher/dispatcher.js');
var ActivityConstants = require('../constants/activityConstants.js');

var ActivityActions = {
  receiveAllActivities: function (activities) {
    Dispatcher.dispatch({
      actionType: ActivityConstants.ACTIVITIES_RECEIVED,
      activities: activities
    });
  },

  receiveSingleActivity: function (activity) {
    Dispatcher.dispatch({
      actionType: ActivityConstants.ACTIVITY_RECEIVED,
      activity: activity
    });
  }
}

module.exports = ActivityActions;
window.ActivityActions = ActivityActions;
