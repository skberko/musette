var RouteActions = require('../actions/routeActions.js');


var ApiUtil = {

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

module.exports = ApiUtil;

// For console testing purposes only;
// to be removed before app goes into production:
window.ApiUtil = ApiUtil;
