// var ApiActions = require('../actions/activityActions.js');

var ApiUtil = {
  fetchAllActivities: function () {
    $.ajax({
      url: "api/activities",
      success: function (activities) {
        console.log(activities)
        // ApiActions.receiveAllActivities(activities);
      }
    })
  },

  fetchActivityStream: function (id) {
    $.ajax({
      url: "api/activity_streams/" + id,
      success: function (activityStream) {
        console.log(activityStream)
        // ApiActions.receiveSinglePokemon(pokemon);
      }
    })
  }
}

module.exports = ApiUtil;

// For console testing purposes only;
// to be removed before app goes into production:
window.ApiUtil = ApiUtil;
