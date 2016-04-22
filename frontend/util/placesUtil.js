var PlacesActions = require('../actions/placesActions.js');

var ApiUtil = {
  fetchAllActivities: function () {
    $.ajax({
      url: "api/activities",
      success: function (activities) {
        ActivityActions.receiveAllActivities(activities);
      }
    })
  },

  // fetchActivityStream: function (id) {
  //   $.ajax({
  //     url: "api/activity_streams/" + id,
  //     success: function (activityStream) {
  //       console.log(activityStream)
  //       ActivityActions.receiveSingleActivity(activity);
  //     }
  //   })
  // },

  fetchAllRoutes: function () {
    $.ajax({
      url: "api/routes",
      success: function (routes) {
        RouteActions.receiveAllRoutes(routes);
      }
    })
  },

  fetchRouteDetail: function (id) {
    $.ajax({
      url: "api/routes/" + id,
      success: function (routeDetail) {
        RouteActions.receiveRouteDetail(routeDetail)
      }
    })
  }
}

module.exports = PlacesUtil;

// For console testing purposes only;
// to be removed before app goes into production:
window.PlacesUtil = PlacesUtil;
